import { expect, test } from "@playwright/test";

for (const theme of ["light", "dark"] as const) {
  test(`actions-passed looks right in ${theme}`, async ({ page }, testInfo) => {
    test.skip(testInfo.project.name !== "chromium", "baselines are captured on chromium");
    test.skip(!process.env.CI, "run visual tests in the pinned container");
    await page.goto(`./?scenario=actions-passed&theme=${theme}&controls=0`);
    await expect(page.locator(".ps-checks")).toBeVisible();
    await expect(page.locator(".js-live-scene")).toHaveScreenshot(`actions-passed-${theme}.png`, {
      animations: "disabled",
      maxDiffPixelRatio: 0.02,
    });
  });
}
