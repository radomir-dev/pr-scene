import { describe, expect, it } from "vitest";
import { renderScene } from "../src/index";
import type { Scene } from "../src/scene";

const PR = {
  title: "Add the timeline",
  number: 7,
  author: "tiriana",
  base: "main",
  head: "feat/timeline",
  state: "open" as const,
};

function scene(overrides: Partial<Scene> = {}): Scene {
  return { pr: PR, ...overrides };
}

describe("renderTimeline", () => {
  it("keeps the order the scene declares", () => {
    const html = renderScene(
      scene({
        timeline: [
          { kind: "comment", comment: { author: "tiriana", body: "first" } },
          { kind: "checks" },
          { kind: "merged", actor: "tiriana", sha: "abc1234" },
        ],
      }),
    );
    const comment = html.indexOf("first");
    const checks = html.indexOf("ps-checks");
    const merged = html.indexOf("ps-event-badge--merged");
    expect(comment).toBeGreaterThan(-1);
    expect(comment).toBeLessThan(checks);
    expect(checks).toBeLessThan(merged);
  });

  it("renders the merge event with GitHub's copy and the purple badge", () => {
    const html = renderScene(
      scene({ timeline: [{ kind: "merged", actor: "tiriana", sha: "abc1234" }] }),
    );
    expect(html).toContain("merged");
    expect(html).toContain("commit <code>abc1234</code>");
    expect(html).toContain("into <code>main</code>");
    expect(html).toContain("ps-event-badge--merged");
  });
});

describe("checks item", () => {
  it("falls back to a checks item when no timeline is declared", () => {
    const html = renderScene(scene());
    expect(html).toContain("ps-checks");
    expect(html).toContain("Waiting for status to be reported");
  });

  it("gives the checks badge the worst status in the run", () => {
    const html = renderScene(
      scene({
        timeline: [{ kind: "checks" }],
        checks: [
          { name: "lint", status: "passed" },
          { name: "test", status: "failed" },
        ],
      }),
    );
    expect(html).toContain('aria-label="Failed"');
  });
});

describe("reviews", () => {
  it("renders an approving review with GitHub's copy", () => {
    const html = renderScene(
      scene({
        timeline: [{ kind: "review", review: { author: "mira-chen", state: "approved" } }],
      }),
    );
    expect(html).toContain("approved these changes");
    expect(html).toContain("ps-review--approved");
  });

  it("marks requested changes", () => {
    const html = renderScene(
      scene({
        timeline: [{ kind: "review", review: { author: "mira-chen", state: "changes-requested" } }],
      }),
    );
    expect(html).toContain("requested changes");
    expect(html).toContain("ps-review--changes-requested");
  });
});
