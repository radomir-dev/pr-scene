import { describe, expect, it } from "vitest";
import { renderHeader } from "../src/render/header";
import type { PullRequest } from "../src/scene";

function pullRequest(overrides: Partial<PullRequest> = {}): PullRequest {
  return {
    title: "Add a scene renderer",
    number: 12,
    author: "tiriana",
    base: "main",
    head: "feat/scene",
    state: "open",
    ...overrides,
  };
}

describe("renderHeader", () => {
  it("renders the title, number, author and branch chips", () => {
    const html = renderHeader(pullRequest());
    expect(html).toContain("Add a scene renderer");
    expect(html).toContain("#12");
    expect(html).toContain("<code>main</code>");
    expect(html).toContain("<code>feat/scene</code>");
    expect(html).toContain("<strong>tiriana</strong>");
  });

  it("renders each pull request state with its matching icon", () => {
    expect(renderHeader(pullRequest({ state: "open" }))).toContain("ps-state--open");
    expect(renderHeader(pullRequest({ state: "merged" }))).toContain("ps-state--merged");
    expect(renderHeader(pullRequest({ state: "closed" }))).toContain("ps-state--closed");
    expect(renderHeader(pullRequest({ state: "merged" }))).toContain("octicon-git-merge");
    expect(renderHeader(pullRequest({ state: "closed" }))).toContain(
      "octicon-git-pull-request-closed",
    );
  });

  it("escapes untrusted text and shows an optional commit count", () => {
    const html = renderHeader({ ...pullRequest({ title: "<script>", author: "a&b" }), commits: 1 });
    expect(html).not.toContain("<script>");
    expect(html).toContain("&lt;script&gt;");
    expect(html).toContain("a&amp;b");
    expect(html).toContain("1 commit into");
  });
});
