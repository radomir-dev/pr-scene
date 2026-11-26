import { describe, expect, it } from "vitest";
import { actionsScene } from "../demo/scenes";
import { SCENARIOS } from "../demo/scenarios";
import { renderScene, validateScene } from "../src/index";

describe("the scenario registry", () => {
  it("validates and renders every scenario", () => {
    for (const scenario of SCENARIOS) {
      expect(validateScene(scenario.scene)).toEqual([]);
      expect(renderScene(scenario.scene)).toContain('class="ps-root"');
    }
  });

  it("covers running, passed, failed and merged", () => {
    const ids = SCENARIOS.map((scenario) => scenario.id);
    expect(ids).toEqual(
      expect.arrayContaining([
        "actions-running",
        "actions-passed",
        "actions-failed",
        "actions-merged",
      ]),
    );
  });
});

describe("the actions sticky comment", () => {
  it("keeps the marker, both toggles and the footer slot", () => {
    const scene = actionsScene("running");
    const item = scene.timeline?.[0];
    const body = item?.kind === "comment" ? item.comment.body : "";
    expect(body).toContain("<!-- pr-slots -->");
    expect(body).toContain("toggle:docs");
    expect(body).toContain("toggle:mutation");
    expect(body).toContain("toggle:visual");
    expect(body).toContain("slot:footer");
  });

  it("shows the merged state", () => {
    const html = renderScene(actionsScene("merged"));
    expect(html).toContain("ps-state--merged");
    expect(html).toContain("Pull request successfully merged and closed");
  });
});

describe("the actions sticky toggles", () => {
  it("renders every toggle as an interactive checkbox", () => {
    const html = renderScene(actionsScene("passed"));
    expect(html.match(/task-list-item-checkbox/g)).toHaveLength(3);
    expect(html).not.toContain("disabled");
  });

  it("leaves the docs toggle on whenever its status has something to report", () => {
    for (const variant of ["running", "passed", "failed", "merged"] as const) {
      const html = renderScene(actionsScene(variant));
      expect(html.match(/aria-label="Completed task"/g)).toHaveLength(1);
      expect(html.match(/aria-label="Incomplete task"/g)).toHaveLength(2);
    }
  });
});
