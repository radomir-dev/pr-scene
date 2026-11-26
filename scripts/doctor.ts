import { Listr } from "listr2";
import type { ListrTask, ListrTaskObject } from "listr2";
import { parseDoctorArgs } from "./doctor/args.ts";
import { readDoctorState, selectSteps, skipReason, STEPS } from "./doctor/steps.ts";
import { runStep } from "./doctor/run.ts";
import type { DoctorState, Phase, Step, Tally } from "./doctor/types.ts";

const PHASES: Phase[] = ["independent", "build", "post-build"];

function taskFor(step: Step, state: DoctorState): ListrTask<DoctorState> {
  return {
    title: step.title,
    skip: () => skipReason(step, state),
    task: (_ctx, task) => runStep(step, task),
  };
}

async function runPhase(phase: Phase, steps: Step[], state: DoctorState): Promise<Tally> {
  const phaseSteps = steps.filter((step) => step.phase === phase);
  if (phaseSteps.length === 0) return { passed: 0, failed: [], skipped: 0 };
  const listr = new Listr<DoctorState>(
    phaseSteps.map((step) => taskFor(step, state)),
    {
      ctx: state,
      concurrent: phase !== "build",
      exitOnError: false,
      rendererOptions: { showSkipMessage: true, collapseSkips: false },
    },
  );
  await listr.run();
  if (phase === "build") state.buildFailed = listr.tasks.some((task) => task.hasFailed());
  return tally(listr.tasks);
}

function tally(tasks: ListrTaskObject<DoctorState>[]): Tally {
  return {
    passed: tasks.filter((task) => task.isCompleted()).length,
    failed: tasks.filter((task) => task.hasFailed()).map((task) => task.title ?? "unknown"),
    skipped: tasks.filter((task) => task.isSkipped()).length,
  };
}

function merge(totals: Tally, phase: Tally): void {
  totals.passed += phase.passed;
  totals.skipped += phase.skipped;
  totals.failed.push(...phase.failed);
}

function report(totals: Tally): void {
  const total = totals.passed + totals.failed.length + totals.skipped;
  console.log(
    `\ndoctor: ${totals.passed} passed, ${totals.failed.length} failed, ${totals.skipped} skipped of ${total}`,
  );
  if (totals.failed.length === 0) return;
  console.error(`failed: ${totals.failed.join(", ")}`);
  process.exitCode = 1;
}

async function main(): Promise<void> {
  const state = await readDoctorState(parseDoctorArgs(process.argv.slice(2)));
  const steps = selectSteps(STEPS, state.only);
  const totals: Tally = { passed: 0, failed: [], skipped: 0 };
  for (const phase of PHASES) merge(totals, await runPhase(phase, steps, state));
  report(totals);
}

try {
  await main();
} catch (error) {
  const message = error instanceof Error ? error.message : String(error);
  console.error(`doctor: ${message}`);
  process.exitCode = 1;
}
