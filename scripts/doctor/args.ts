import type { DoctorOptions } from "./types.ts";

export function parseDoctorArgs(argv: string[]): DoctorOptions {
  const options: DoctorOptions = { fast: false, only: null };
  for (const arg of argv) {
    if (arg === "--fast") options.fast = true;
    else if (arg.startsWith("--only=")) options.only = splitNames(arg.slice("--only=".length));
    else throw new Error(`unknown argument: ${arg} (expected --fast or --only=name)`);
  }
  return options;
}

function splitNames(value: string): string[] {
  const names = value.split(",").map((name) => name.trim());
  return names.filter((name) => name.length > 0);
}
