import { describe, expect, it } from "vitest";
import { renderScene } from "../src/index";
import type { Scene } from "../src/scene";

function scene(overrides: Partial<Scene["pr"]> = {}): Scene {
  return {
    pr: {
      title: "Add the scene renderer",
      number: 12,
      author: "tiriana",
      base: "main",
      head: "feat/scene",
      state: "open",
      ...overrides,
    },
  };
}

describe("renderScene", () => {
  it("renders the title, number and branches", () => {
    const html = renderScene(scene());
    expect(html).toContain("Add the scene renderer");
    expect(html).toContain("#12");
    expect(html).toContain("feat/scene");
  });

  it("escapes untrusted text", () => {
    const html = renderScene(scene({ title: "<img src=x onerror=alert(1)>" }));
    expect(html).not.toContain("<img");
    expect(html).toContain("&lt;img");
  });

  it("marks the state on the pill", () => {
    expect(renderScene(scene({ state: "merged" }))).toContain("ps-state--merged");
  });
});
