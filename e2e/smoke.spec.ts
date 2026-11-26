import { expect, test } from "@playwright/test";
import { SCENARIOS } from "../demo/scenarios";

for (const scenario of SCENARIOS) {
  test(`renders ${scenario.id}`, async ({ page }) => {
    await page.goto(`./?scenario=${scenario.id}&controls=0`);
    await expect(page.locator(".ps-header .ps-title")).toBeVisible();
    await expect(page.locator(".ps-comment")).toHaveCount(1);
    await expect(page.locator(".ps-checks")).toBeVisible();
    await expect(page.getByRole("status")).toHaveCount(0);
  });
}
