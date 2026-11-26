import { expect, test } from "@playwright/test";
import { SCENARIOS } from "../demo/scenarios";

for (const scenario of SCENARIOS) {
  for (const theme of ["light", "dark"]) {
    test(`${scenario.id} in ${theme}`, async ({ page }) => {
      await page.goto(`./?scenario=${scenario.id}&theme=${theme}&controls=0`);
      await expect(page.locator(".ps-checks")).toBeVisible();
      await page.locator(".js-live-scene").screenshot({
        path: `screenshots/${scenario.id}-${theme}.png`,
        animations: "disabled",
      });
    });
  }
}
