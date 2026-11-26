import { expect, test } from "@playwright/test";

test("the static storybook story looks right", async ({ page }, testInfo) => {
  test.skip(testInfo.project.name !== "chromium", "baselines are captured on chromium");
  await page.goto("http://127.0.0.1:4315/iframe.html?id=scenarios--actions-passed&viewMode=story");
  await expect(page.locator(".ps-checks")).toBeVisible();
  await expect(page.locator("#storybook-root")).toHaveScreenshot("storybook-actions-passed.png", {
    animations: "disabled",
    maxDiffPixelRatio: 0.02,
  });
});
