import { expect, test } from "@playwright/test";

test(
  "Shows Rolnopol title on homepage",
  { tag: ["@health", "@smoke", "@p0"] },
  async ({ page }) => {
    await page.goto("");

    await expect(page).toHaveTitle(/Rolnopol/);
  },
);
