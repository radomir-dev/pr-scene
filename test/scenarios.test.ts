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
    expect(body).toContain("toggle:preview");
    expect(body).toContain("toggle:visual");
    expect(body).toContain("slot:footer");
  });

  it("renders both toggles as enabled task checkboxes", () => {
    const html = renderScene(actionsScene("passed"));
    expect(html.match(/task-list-item-checkbox/g)).toHaveLength(2);
    expect(html).not.toContain("disabled");
  });

  it("shows the failure state with a blocking merge footer", () => {
    const html = renderScene(actionsScene("failed"));
    expect(html).toContain("Some checks were not successful");
    expect(html).toContain("Merging is blocked");
  });

  it("shows the merged state", () => {
    const html = renderScene(actionsScene("merged"));
    expect(html).toContain("ps-state--merged");
    expect(html).toContain("Pull request successfully merged and closed");
  });
});
