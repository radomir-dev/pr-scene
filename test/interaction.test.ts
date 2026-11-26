import { beforeEach, describe, expect, it } from "vitest";
import { wireScene, type Session } from "../demo/interaction";
import { passCheck, startChecks } from "../demo/session";
import { renderScene } from "../src/index";
import type { Scene } from "../src/scene";

const PR = {
  title: "Interact",
  number: 11,
  author: "tiriana",
  base: "main",
  head: "feat/interact",
  state: "open" as const,
};

function scene(): Scene {
  return {
    pr: PR,
    timeline: [
      { kind: "comment", comment: { author: "bot", body: "- [ ] one\n- [ ] two" } },
      { kind: "checks" },
    ],
    checks: [
      { name: "lint", status: "queued" },
      { name: "test", status: "queued" },
    ],
    mergeable: true,
  };
}

function fakeSession(calls: string[]): Session {
  return {
    current: scene(),
    toggle: (index) => calls.push(`toggle:${index}`),
    run: () => calls.push("run"),
    merge: () => calls.push("merge"),
    reset: () => calls.push("reset"),
  };
}

function mount(target: Scene): void {
  document.body.innerHTML = `<div class="js-live-scene">${renderScene(target)}</div>`;
}

describe("wireScene", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("reports the checkbox index that changed", () => {
    const calls: string[] = [];
    mount(scene());
    wireScene(() => fakeSession(calls));
    const boxes = document.querySelectorAll<HTMLInputElement>('input[type="checkbox"]');
    boxes[1]?.click();
    expect(calls).toEqual(["toggle:1"]);
  });

  it("merges only when the button is enabled", () => {
    const calls: string[] = [];
    mount(scene());
    wireScene(() => fakeSession(calls));
    document.querySelector<HTMLButtonElement>(".ps-merge-button")?.click();
    expect(calls).toEqual([]);

    const ready = passCheck(passCheck(startChecks(scene()), 0), 1);
    mount(ready);
    wireScene(() => fakeSession(calls));
    const button = document.querySelector<HTMLButtonElement>(".ps-merge-button");
    expect(button?.disabled).toBe(false);
    button?.click();
    expect(calls).toEqual(["merge"]);
  });
});
