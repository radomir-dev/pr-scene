import { describe, expect, it } from "vitest";
import { renderChecks } from "../src/render/checks";
import { renderScene } from "../src/render/scene";
import type { CheckRun } from "../src/scene";

function run(overrides: Partial<CheckRun> = {}): CheckRun {
  return {
    status: "passed",
    workflow: "CI",
    name: "unit tests",
    duration: "2m 14s",
    ...overrides,
  };
}

describe("check rows", () => {
  it("derives the summary and renders rows with native detail drawers", () => {
    const html = renderChecks([
      run(),
      run({ status: "running", name: "type check" }),
      run({ status: "failed" }),
    ]);
    expect(html).toContain("Some checks were not successful");
    expect(html).toContain("Merging is blocked");
    expect(html).toContain("1 failing, 1 successful check, 1 in progress");
    expect(html).toContain("ps-status--running");
    expect(html).toContain("<summary>Details</summary>");
    expect(html).toContain("Check is still running.");
  });

  it("escapes check labels and log output", () => {
    const html = renderChecks([
      run({ workflow: "<CI>", name: "test & lint", details: "<script>alert(1)</script>" }),
    ]);
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;CI&gt;");
    expect(html).toContain("test &amp; lint");
    expect(html).toContain("&lt;script&gt;");
  });

  it("omits zero counts and pluralizes successful checks", () => {
    const html = renderChecks([run({ status: "failed" }), run(), run()]);
    expect(html).toContain("1 failing, 2 successful checks");
  });
});

describe("checks header copy", () => {
  it("distinguishes successful and pending checks", () => {
    expect(renderChecks([run()])).toContain("All checks have passed");
    expect(renderChecks([run({ status: "queued" })])).toContain(
      "Some checks haven’t completed yet",
    );
  });
});

describe("merge footer", () => {
  it("allows merging when mergeability is omitted and blocks known conflicts", () => {
    const ready = renderChecks([run()]);
    const blocked = renderChecks([run()], false);
    expect(ready).toContain("This branch has no conflicts with the base branch");
    expect(ready).toContain(">Merge pull request</button>");
    expect(blocked).toContain("Merging is blocked");
    expect(blocked).toContain(" disabled>Merge pull request</button>");
  });

  it("shows merged copy and a disabled merged button", () => {
    const merged = renderChecks([run()], true, true);
    expect(merged).toContain("Pull request successfully merged and closed");
    expect(merged).toContain('class="ps-merge-button ps-merge-button--merged"');
    expect(merged).toContain(" disabled>Merged</button>");
  });

  it("shows the default waiting state when no checks are provided", () => {
    const html = renderChecks([]);
    expect(html).toContain('<h2 class="ps-checks-title">Waiting for status to be reported</h2>');
    expect(html).toContain('<p class="ps-checks-summary">No checks reported</p>');
    expect(html).toContain("Some checks haven’t completed yet");
    expect(html).toContain(" disabled>Merge pull request</button>");
  });
});

describe("renderScene checks", () => {
  it("composes scene checks, mergeability and commit count", () => {
    const html = renderScene({
      pr: {
        title: "Pull request",
        number: 12,
        author: "tiriana",
        base: "main",
        head: "feature",
        state: "open",
        commits: 2,
      },
      checks: [run()],
      mergeable: true,
    });
    expect(html).toContain("2 commits into");
    expect(html).toContain("unit tests");
    expect(html).toContain("This branch has no conflicts with the base branch");
    expect(html).toContain(">Merge pull request</button>");
  });
});
