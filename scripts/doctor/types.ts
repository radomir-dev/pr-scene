export type Phase = "independent" | "build" | "post-build";

export interface Step {
  name: string;
  title: string;
  phase: Phase;
  slow?: boolean;
  needsBuild?: boolean;
  script?: string;
  bin?: string;
  run?: () => Promise<void>;
}

export interface DoctorOptions {
  fast: boolean;
  only: string[] | null;
}

export interface DoctorState extends DoctorOptions {
  scripts: Record<string, string>;
  buildFailed: boolean;
}

export interface Tally {
  passed: number;
  failed: string[];
  skipped: number;
}
