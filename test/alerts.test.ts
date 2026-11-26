import { describe, expect, it } from "vitest";
import { renderMarkdown } from "../src/index";

const CASES = [
  ["NOTE", "Note"],
  ["TIP", "Tip"],
  ["IMPORTANT", "Important"],
  ["WARNING", "Warning"],
  ["CAUTION", "Caution"],
] as const;

describe("GitHub alerts", () => {
  it.each(CASES)("renders a %s alert with its title", (kind, title) => {
    const html = renderMarkdown(`> [!${kind}]\n> Something to say.`);
    expect(html).toContain(`markdown-alert-${kind.toLowerCase()}`);
    expect(html).toContain("markdown-alert-title");
    expect(html).toContain(`>${title}<`);
    expect(html).toContain("Something to say.");
  });

  it("keeps text that follows the marker on the same line", () => {
    const html = renderMarkdown("> [!TIP] Shortcut: press K");
    expect(html).toContain("markdown-alert-tip");
    expect(html).toContain("Shortcut: press K");
  });

  it("leaves ordinary blockquotes untouched", () => {
    const html = renderMarkdown("> Just a quote");
    expect(html).toContain("<blockquote>");
    expect(html).not.toContain("markdown-alert");
  });

  it("ignores an unknown marker", () => {
    const html = renderMarkdown("> [!BANANA]\n> Not an alert.");
    expect(html).not.toContain("markdown-alert");
  });
});
