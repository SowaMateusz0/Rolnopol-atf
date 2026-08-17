import { expect, test } from "@playwright/test";

test("Shows Rolnopol title on homepage", async ({ page }) => {
  await page.goto("");

  await expect(page).toHaveTitle(/Rolnopol/);
});
