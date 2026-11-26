import { describe, expect, it } from "vitest";
import { renderComment, relativeTime } from "../src/index";

const NOW = Date.parse("2026-11-26T12:00:00Z");

describe("relativeTime", () => {
  it("speaks GitHub's relative vocabulary", () => {
    expect(relativeTime("2026-11-26T11:58:00Z", NOW)).toBe("2 minutes ago");
    expect(relativeTime("2026-11-26T09:00:00Z", NOW)).toBe("3 hours ago");
    expect(relativeTime("2026-11-20T12:00:00Z", NOW)).toBe("6 days ago");
    expect(relativeTime("2026-11-26T11:59:30Z", NOW)).toBe("just now");
  });

  it("returns nothing for an unparseable date", () => {
    expect(relativeTime("not a date", NOW)).toBe("");
  });
});

describe("renderComment", () => {
  it("marks bots and edited comments", () => {
    const html = renderComment(
      {
        author: "github-actions",
        body: "hi",
        bot: true,
        edited: true,
        createdAt: "2026-11-26T11:58:00Z",
      },
      { now: NOW },
    );
    expect(html).toContain("ps-comment-bot");
    expect(html).toContain("ps-comment-edited");
    expect(html).toContain("2 minutes ago");
  });

  it("omits the bot pill and edited marker for humans", () => {
    const html = renderComment({ author: "tiriana", body: "hi" });
    expect(html).not.toContain("ps-comment-bot");
    expect(html).not.toContain("ps-comment-edited");
  });
});

describe("renderComment body", () => {
  it("renders the body through the markdown pipeline", () => {
    expect(renderComment({ author: "tiriana", body: "**bold**" })).toContain(
      "<strong>bold</strong>",
    );
    expect(renderComment({ author: "tiriana", body: "<script>x</script>" })).not.toContain(
      "<script",
    );
  });

  it("falls back to initials for an unsafe avatar url", () => {
    const html = renderComment({
      author: "jane-doe",
      body: "hi",
      avatarUrl: "javascript:alert(1)",
    });
    expect(html).not.toContain("javascript:");
    expect(html).toContain(">JD<");
  });

  it("uses the avatar image when the url is safe", () => {
    const html = renderComment({
      author: "jane",
      body: "hi",
      avatarUrl: "https://example.com/a.png",
    });
    expect(html).toContain('src="https://example.com/a.png"');
  });
});
