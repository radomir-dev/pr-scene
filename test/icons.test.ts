import { describe, expect, it } from "vitest";
import { renderIcon, statusIcon } from "../src/index";

describe("statusIcon", () => {
  it("labels every status for assistive technology", () => {
    expect(statusIcon("passed")).toContain('aria-label="Passed"');
    expect(statusIcon("failed")).toContain('aria-label="Failed"');
    expect(statusIcon("running")).toContain('aria-label="In progress"');
    expect(statusIcon("queued")).toContain('aria-label="Queued"');
  });

  it("spins only while running", () => {
    expect(statusIcon("running")).toContain("ps-spinner");
    expect(statusIcon("passed")).not.toContain("ps-spinner");
    expect(statusIcon("queued")).not.toContain("ps-spinner");
  });

  it("paints each status with its own tone", () => {
    expect(statusIcon("failed")).toContain("ps-status--failed");
    expect(statusIcon("passed")).toContain("ps-status--passed");
  });
});

describe("renderIcon", () => {
  it("scales the octicon to the requested size", () => {
    expect(renderIcon("git-pull-request", 28)).toContain('width="28"');
    expect(renderIcon("git-pull-request")).toContain('width="16"');
  });
});
