import { describe, expect, it } from "vitest";
import {
  allPassed,
  isRunning,
  mergeScene,
  passCheck,
  startChecks,
  toggleTaskInScene,
} from "../demo/session";
import type { Scene } from "../src/scene";

const AT = "2026-11-26T12:00:00Z";

function scene(): Scene {
  return {
    pr: {
      title: "Interact",
      number: 11,
      author: "tiriana",
      base: "main",
      head: "feat/interact",
      state: "open",
    },
    timeline: [
      {
        kind: "comment",
        comment: {
          author: "github-actions",
          body: "- [ ] one\n- [ ] two\n\n<!-- slot:status -->\nidle\n<!-- /slot:status -->\n\n<!-- slot:footer -->\n<!-- /slot:footer -->",
        },
      },
      { kind: "checks" },
    ],
    checks: [
      { name: "lint", status: "queued" },
      { name: "test", status: "queued" },
    ],
    mergeable: true,
  };
}

function bodyOf(target: Scene): string {
  const item = target.timeline?.[0];
  return item?.kind === "comment" ? item.comment.body : "";
}

describe("toggling tasks", () => {
  it("flips the nth task and marks the comment edited", () => {
    const next = toggleTaskInScene(scene(), 1, AT);
    expect(bodyOf(next)).toContain("- [ ] one\n- [x] two");
    const item = next.timeline?.[0];
    expect(item?.kind === "comment" && item.comment.edited).toBe(true);
    expect(item?.kind === "comment" && item.comment.createdAt).toBe(AT);
  });
});

describe("simulated run", () => {
  it("starts every check and fills the status slot", () => {
    const next = startChecks(scene());
    expect(isRunning(next)).toBe(true);
    expect(bodyOf(next)).toContain("Workflow running");
  });

  it("passes checks one at a time and fills the footer when done", () => {
    const started = startChecks(scene());
    const halfway = passCheck(started, 0);
    expect(allPassed(halfway)).toBe(false);
    expect(bodyOf(halfway)).not.toContain("Workflow run #1234");

    const done = passCheck(halfway, 1);
    expect(allPassed(done)).toBe(true);
    expect(bodyOf(done)).toContain("All checks passed");
    expect(bodyOf(done)).toContain("actions/runs/1234");
  });

  it("keeps skipped jobs skipped and counts them as settled", () => {
    const base = scene();
    base.checks = [...(base.checks ?? []), { name: "e2e", status: "skipped" }];
    const started = startChecks(base);
    expect(started.checks?.at(-1)?.status).toBe("skipped");

    const done = passCheck(passCheck(started, 0), 1);
    expect(allPassed(done)).toBe(true);
    expect(done.checks?.at(-1)?.status).toBe("skipped");
  });
});

describe("merging", () => {
  it("switches the PR state and appends one merge event", () => {
    const merged = mergeScene(passCheck(passCheck(startChecks(scene()), 0), 1), AT);
    expect(merged.pr.state).toBe("merged");
    expect(merged.timeline?.filter((item) => item.kind === "merged")).toHaveLength(1);
    expect(mergeScene(merged, AT).timeline?.filter((item) => item.kind === "merged")).toHaveLength(
      1,
    );
  });
});
