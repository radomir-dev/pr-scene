import fc from "fast-check";
import { describe, expect, it } from "vitest";
import { renderMarkdown, renderScene, validateScene } from "../src/index";
import { normalizeGitHubHtml } from "../src/markdown-normalize";
import type { Scene } from "../src/scene";

const safeText = fc.stringMatching(/^[a-z .:-]{0,24}$/);
const taskList = fc
  .array(fc.tuple(fc.boolean(), safeText), { minLength: 1, maxLength: 6 })
  .map(
    (items) =>
      `<ul>${items
        .map(
          ([done, label]) =>
            `<li><input type="checkbox"${done ? " checked" : ""} disabled> ${label}</li>`,
        )
        .join("")}</ul>`,
  );

const INJECTIONS = [
  "<script>alert(1)</script>",
  "<img src=x onerror=alert(1)>",
  "<svg onload=alert(1)></svg>",
  '<iframe src="javascript:alert(1)"></iframe>',
  '<a href="javascript:alert(1)">x</a>',
];

const pr = fc.record({
  title: safeText,
  number: fc.integer({ min: 0, max: 9999 }),
  author: safeText,
  base: safeText,
  head: safeText,
  state: fc.constantFrom("open", "merged", "closed" as const),
});

const scene = pr.map((fields) => ({ pr: fields }) as unknown as Scene);

describe("normalizeGitHubHtml", () => {
  it("keeps every task item and re-enables its checkbox", () => {
    fc.assert(
      fc.property(taskList, (html) => {
        const output = normalizeGitHubHtml(html);
        const inputs = [...output.matchAll(/<input[^>]*type="checkbox"[^>]*>/g)];
        expect(inputs).toHaveLength((html.match(/<li>/g) ?? []).length);
        expect(output).not.toContain("disabled");
        expect(output).toMatch(/aria-label="(Incomplete|Completed) task"/);
      }),
      { numRuns: 50 },
    );
  });

  it("marks list and item classes for every checkbox", () => {
    fc.assert(
      fc.property(taskList, (html) => {
        const output = normalizeGitHubHtml(html);
        const inputs = (output.match(/<input/g) ?? []).length;
        expect((output.match(/contains-task-list/g) ?? []).length).toBe(inputs > 0 ? 1 : 0);
        expect((output.match(/task-list-item/g) ?? []).length).toBeGreaterThanOrEqual(inputs);
      }),
      { numRuns: 50 },
    );
  });
});

describe("renderMarkdown safety", () => {
  it("never lets an injection through, whatever the order", () => {
    fc.assert(
      fc.property(
        fc.array(fc.constantFrom(...INJECTIONS), { maxLength: 5 }),
        safeText,
        (parts, text) => {
          const html = renderMarkdown(`${text}\n\n${parts.join("\n\n")}`).toLowerCase();
          expect(html).not.toContain("<script");
          expect(html).not.toContain("onerror=");
          expect(html).not.toContain("onload=");
          expect(html).not.toContain('href="javascript:');
        },
      ),
      { numRuns: 50 },
    );
  });
});

describe("validateScene", () => {
  it("accepts any generated valid scene and renders it", () => {
    fc.assert(
      fc.property(scene, (value) => {
        expect(validateScene(value)).toEqual([]);
        expect(renderScene(value)).toContain('class="ps-root"');
      }),
      { numRuns: 50 },
    );
  });

  it("names the missing path for every required pull request field", () => {
    const required = ["title", "number", "author", "base", "head", "state"];
    fc.assert(
      fc.property(scene, fc.constantFrom(...required), (value, key) => {
        const broken = structuredClone(value) as unknown as { pr: Record<string, unknown> };
        delete broken.pr[key];
        const errors = validateScene(broken);
        expect(errors.join(" ")).toContain(`scene.pr.${key}`);
      }),
      { numRuns: 50 },
    );
  });
});
