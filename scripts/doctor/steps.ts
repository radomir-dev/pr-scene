import { existsSync } from "node:fs";
import { readFile, stat } from "node:fs/promises";
import { join } from "node:path";
import type { DoctorOptions, DoctorState, Step } from "./types.ts";

const ARTIFACTS = ["dist/index.js", "dist/index.d.ts", "dist/styles.css"];

export const STEPS: Step[] = [
  { name: "typecheck", title: "typecheck", phase: "independent", script: "typecheck", bin: "tsc" },
  { name: "lint", title: "lint", phase: "independent", script: "lint", bin: "oxlint" },
  {
    name: "format",
    title: "format check",
    phase: "independent",
    script: "format:check",
    bin: "oxfmt",
  },
  {
    name: "test",
    title: "test with coverage",
    phase: "independent",
    script: "test:coverage",
    bin: "vitest",
  },
  { name: "e2e", title: "e2e", phase: "independent", script: "test:e2e", slow: true },
  { name: "build", title: "build", phase: "build", script: "build", bin: "tsc" },
  { name: "dist", title: "dist artifacts", phase: "post-build", needsBuild: true, run: verifyDist },
];

export async function readDoctorState(options: DoctorOptions): Promise<DoctorState> {
  const text = await readFile(join(process.cwd(), "package.json"), "utf8");
  const pkg = JSON.parse(text) as { scripts?: Record<string, string> };
  return { ...options, scripts: pkg.scripts ?? {}, buildFailed: false };
}

export function selectSteps(steps: Step[], only: string[] | null): Step[] {
  if (!only) return steps;
  const known = new Set(steps.map((step) => step.name));
  const unknown = only.filter((name) => !known.has(name));
  if (unknown.length > 0)
    throw new Error(`unknown step ${unknown.join(", ")}; known: ${[...known].join(", ")}`);
  const wanted = new Set(only);
  if (steps.some((step) => step.needsBuild && wanted.has(step.name))) wanted.add("build");
  return steps.filter((step) => wanted.has(step.name));
}

export function skipReason(step: Step, state: DoctorState): string | false {
  const reasons = [
    fastSkip(step, state),
    buildSkip(step, state),
    scriptSkip(step, state),
    binSkip(step),
  ];
  return reasons.find((reason) => reason !== false) ?? false;
}

function fastSkip(step: Step, state: DoctorState): string | false {
  return step.slow && state.fast ? "skipped by --fast" : false;
}

function buildSkip(step: Step, state: DoctorState): string | false {
  return step.needsBuild && state.buildFailed ? "build failed" : false;
}

function scriptSkip(step: Step, state: DoctorState): string | false {
  if (!step.script) return false;
  if (state.scripts[step.script]) return false;
  return `package.json has no "${step.script}" script`;
}

function binSkip(step: Step): string | false {
  if (!step.bin) return false;
  if (hasBin(step.bin)) return false;
  return `${step.bin} is not installed, run npm install`;
}

function hasBin(bin: string): boolean {
  const name = process.platform === "win32" ? `${bin}.cmd` : bin;
  return existsSync(join(process.cwd(), "node_modules", ".bin", name));
}

async function verifyDist(): Promise<void> {
  const missing: string[] = [];
  for (const file of ARTIFACTS) {
    const info = await stat(join(process.cwd(), file)).catch(() => null);
    if (!info?.isFile() || info.size === 0) missing.push(file);
  }
  if (missing.length > 0) throw new Error(`build did not produce: ${missing.join(", ")}`);
}
