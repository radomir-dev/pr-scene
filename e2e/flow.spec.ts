import { expect, test } from "@playwright/test";

test("ticking a toggle runs the workflow and merges", async ({ page }) => {
  await page.goto("./?scenario=actions-running&theme=light&controls=0");
  await page.locator(".ps-comment input[type=checkbox]").first().check();

  await expect(page.locator(".ps-comment-edited").first()).toBeVisible();
  await expect(page.locator(".ps-checks-title")).toHaveText("All checks have passed", {
    timeout: 15_000,
  });

  const merge = page.locator(".ps-merge-button");
  await expect(merge).toBeEnabled();
  await merge.click();

  await expect(page.locator(".ps-state--merged")).toBeVisible();
  await expect(page.locator(".ps-merge-copy")).toContainText("merged and closed");
  await expect(page.locator(".ps-comment")).toContainText("Workflow run #1234");
});
