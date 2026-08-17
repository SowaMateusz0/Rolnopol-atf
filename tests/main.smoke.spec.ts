import { expect, test } from "@playwright/test";

test(
  "Shows Rolnopol title on homepage",
  { tag: ["@smoke"] },
  async ({ page }) => {
    await page.goto("");

    await expect(page).toHaveTitle(/Rolnopol/);
  },
);

test(
  "Login page loads and is visible",
  { tag: ["@auth", "@smoke", "@p1"] },
  async ({ page }) => {
    await page.goto("/login.html");

    await expect(page).toHaveTitle(/Rolnopol/);
    await expect(
      page.getByRole("heading", { name: /Login to Your User Account/i }),
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /Login/i })).toBeVisible();
  },
);

test(
  "Register page loads and is visible",
  { tag: ["@auth", "@smoke", "@p1"] },
  async ({ page }) => {
    await page.goto("/register.html");

    await expect(page).toHaveTitle(/Rolnopol/);
    await expect(
      page.getByRole("heading", { name: /Create Your User Account/i }),
    ).toBeVisible();
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password", { exact: true })).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Create Account/i }),
    ).toBeVisible();
  },
);
