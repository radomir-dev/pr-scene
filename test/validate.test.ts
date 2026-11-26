import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderScene, SCENE_SCHEMA, validateScene } from "../src/index";
import type { Scene } from "../src/scene";

const PR = {
  title: "Add validation",
  number: 9,
  author: "tiriana",
  base: "main",
  head: "feat/validate",
  state: "open" as const,
};

const FULL: Partial<Scene> = {
  timeline: [
    { kind: "comment", comment: { author: "a", body: "b", bot: true } },
    { kind: "checks" },
    { kind: "review", review: { author: "a", state: "approved" } },
    { kind: "merged", actor: "a", sha: "abc1234" },
  ],
  checks: [{ name: "lint", status: "passed" }],
  mergeable: true,
  view: { theme: "dark" },
};

function scene(overrides: Partial<Scene> = {}): Scene {
  return { pr: PR, ...overrides };
}

describe("validateScene", () => {
  it("accepts a minimal scene and a full one", () => {
    expect(validateScene(scene())).toEqual([]);
    expect(validateScene(scene({ ...FULL }))).toEqual([]);
  });

  it("names the offending path", () => {
    const missing = validateScene({ pr: { ...PR, title: undefined } });
    expect(missing.join()).toContain("scene.pr.title");

    const mistyped = validateScene({ pr: { ...PR, number: "9" } });
    expect(mistyped.join()).toContain("scene.pr.number: expected integer");

    const badState = validateScene({ pr: { ...PR, state: "draft" } });
    expect(badState.join()).toContain("scene.pr.state: expected one of");
  });

  it("rejects an unknown timeline shape and unknown keys", () => {
    expect(validateScene({ pr: PR, timeline: [{ kind: "exploded" }] })[0]).toContain(
      "scene.timeline[0]",
    );
    expect(validateScene({ pr: PR, extra: true })[0]).toContain("scene.extra: unknown property");
  });
});

describe("renderScene", () => {
  it("throws with the path for an invalid scene", () => {
    expect(() => renderScene({ pr: { ...PR, title: 1 } } as unknown as Scene)).toThrow(
      /invalid scene: scene\.pr\.title/,
    );
  });

  it("takes the theme from the scene view when no option is given", () => {
    expect(renderScene(scene({ view: { theme: "dark" } }))).toContain('data-theme="dark"');
    expect(renderScene(scene({ view: { theme: "dark" } }), { theme: "light" })).toContain(
      'data-theme="light"',
    );
  });
});

describe("the shipped schema", () => {
  it("matches the schema the runtime validates against", () => {
    const file = readFileSync(join(process.cwd(), "schema", "scene.schema.json"), "utf8");
    expect(JSON.parse(file)).toEqual(SCENE_SCHEMA);
  });
});
