import type { Scene } from "../src/scene";
import { mergeScene, passCheck, startChecks, toggleTaskInScene } from "./session";

const STEP_MS = 700;

export interface Session {
  readonly current: Scene;
  toggle(index: number): void;
  run(): void;
  merge(): void;
  reset(): void;
}

interface Runtime {
  scene: Scene;
  original: Scene;
  timers: number[];
  running: boolean;
  onChange: (scene: Scene) => void;
}

export function createSession(initial: Scene, onChange: (scene: Scene) => void): Session {
  const runtime: Runtime = {
    scene: structuredClone(initial),
    original: structuredClone(initial),
    timers: [],
    running: false,
    onChange,
  };
  return {
    get current() {
      return runtime.scene;
    },
    toggle: (index) => startToggled(runtime, index),
    run: () => startRun(runtime),
    merge: () => commit(runtime, mergeScene(runtime.scene, new Date().toISOString())),
    reset: () => {
      cancel(runtime);
      commit(runtime, structuredClone(runtime.original));
    },
  };
}

function commit(runtime: Runtime, next: Scene): void {
  runtime.scene = next;
  runtime.onChange(next);
}

function cancel(runtime: Runtime): void {
  for (const timer of runtime.timers) clearTimeout(timer);
  runtime.timers = [];
  runtime.running = false;
}

function schedule(runtime: Runtime): void {
  const checks = runtime.scene.checks ?? [];
  checks.forEach((_, index) => {
    const timer = window.setTimeout(
      () => {
        commit(runtime, passCheck(runtime.scene, index));
        if (index === checks.length - 1) runtime.running = false;
      },
      (index + 1) * STEP_MS,
    );
    runtime.timers.push(timer);
  });
}

function startRun(runtime: Runtime): void {
  if (runtime.running || (runtime.scene.checks ?? []).length === 0) return;
  runtime.running = true;
  commit(runtime, startChecks(runtime.scene));
  schedule(runtime);
}

function startToggled(runtime: Runtime, index: number): void {
  cancel(runtime);
  commit(runtime, toggleTaskInScene(runtime.scene, index, new Date().toISOString()));
  startRun(runtime);
}

export function wireScene(getSession: () => Session): void {
  const root = document.querySelector<HTMLElement>(".js-live-scene");
  if (!root) return;
  root.addEventListener("change", (event) => {
    const input = event.target;
    if (!(input instanceof HTMLInputElement) || input.type !== "checkbox") return;
    getSession().toggle(checkboxIndex(root, input));
  });
  root.addEventListener("click", (event) => {
    const button = (event.target as Element).closest<HTMLButtonElement>(".ps-merge-button");
    if (button && !button.disabled) getSession().merge();
  });
}

function checkboxIndex(root: Element, input: HTMLInputElement): number {
  return [...root.querySelectorAll<HTMLInputElement>('input[type="checkbox"]')].indexOf(input);
}
