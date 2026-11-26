import { readFileSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../src/index";
import { canonicalMarkdown, markdownBody } from "./markdown-canonical";

function fixture(name: string): string {
  return readFileSync(join(process.cwd(), "test", "fixtures", "markdown", name), "utf8");
}

describe("renderMarkdown", () => {
  it.each(["kitchen", "pr-comment"])("matches GitHub for %s.md", (name) => {
    const rendered = renderMarkdown(fixture(`${name}.md`));
    const expected = fixture(`${name}.expected.html`);
    expect(canonicalMarkdown(markdownBody(rendered))).toBe(canonicalMarkdown(expected));
  });

  it("labels task items and enables their checkboxes", () => {
    const html = renderMarkdown("- [x] done\n- [ ] todo");
    expect(html).toContain("contains-task-list");
    expect(html).toContain('aria-label="Completed task"');
    expect(html).toContain('aria-label="Incomplete task"');
    expect(html).not.toContain("disabled");
  });

  it("strips scripts and event handlers", () => {
    const html = renderMarkdown('<script>alert(1)</script>\n\n<img src=x onerror="alert(1)">');
    expect(html).not.toContain("<script");
    expect(html).not.toContain("onerror");
  });

  it("hides slot markers in rendered mode", () => {
    expect(renderMarkdown("<!-- slot:preview -->\n\nHello")).not.toContain("slot:preview");
  });

  it("keeps slot markers visible in source mode", () => {
    const html = renderMarkdown("<!-- slot:preview -->\n\nHello", { mode: "source" });
    expect(html).toContain("&lt;!-- slot:preview --&gt;");
    expect(html).toContain("ps-markdown-source");
  });
});
