import { expect, test } from "@playwright/test";

test(
  "Shows Rolnopol title on homepage",
  { tag: ["@smoke"] },
  async ({ page }) => {
    await page.goto("");

    await expect(page).toHaveTitle(/Rolnopol/);
  },
);
