import { spawn } from "node:child_process";
import { createWriteStream } from "node:fs";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join, relative } from "node:path";
import type { ListrTaskWrapper } from "listr2";
import type { DoctorState, Step } from "./types.ts";

const LOG_DIR = join(process.cwd(), "node_modules", ".cache", "doctor");
const TAIL_LINES = 20;

export async function runStep(step: Step, task: ListrTaskWrapper<DoctorState>): Promise<void> {
  const path = join(LOG_DIR, `${step.name}.log`);
  await mkdir(LOG_DIR, { recursive: true });
  task.output = `log: ${relative(process.cwd(), path)}`;
  const code = step.run ? await runCustom(step.run, step.title, path) : await runScript(step, path);
  if (code === 0) return;
  const tail = await readTail(path);
  throw new Error(
    `${step.title} failed (exit ${code}), full log: ${relative(process.cwd(), path)}\n${tail}`,
  );
}

async function runCustom(run: () => Promise<void>, title: string, path: string): Promise<number> {
  const header = `$ ${title}\n\n`;
  try {
    await run();
  } catch (error) {
    await writeFile(path, `${header}${String(error)}\n`);
    return 1;
  }
  await writeFile(path, `${header}ok\n`);
  return 0;
}

async function runScript(step: Step, path: string): Promise<number> {
  if (!step.script) throw new Error(`${step.name} has no command`);
  const log = createWriteStream(path);
  log.write(`$ npm run ${step.script}\n\n`);
  const child = spawn("npm", ["run", step.script], {
    stdio: ["ignore", "pipe", "pipe"],
    env: { ...process.env, NO_COLOR: "1" },
  });
  child.stdout.pipe(log, { end: false });
  child.stderr.pipe(log, { end: false });
  return new Promise((resolve, reject) => {
    child.once("error", reject);
    child.once("close", (code) => {
      log.end();
      resolve(code ?? 1);
    });
  });
}

async function readTail(path: string): Promise<string> {
  const text = await readFile(path, "utf8").catch(() => "");
  return text.trimEnd().split("\n").slice(-TAIL_LINES).join("\n");
}
