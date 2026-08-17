import { expect, test } from "@playwright/test";
import { RegistrationPage } from "../src/pages/registration.page";

test(
  "Shows Rolnopol title on homepage",
  { tag: ["@health", "@smoke", "@p0"] },
  async ({ page }) => {
    // Arrange
    // The homepage is the target page under test.

    // Act
    await page.goto("");

    // Assert
    await expect(page).toHaveTitle(/Rolnopol/);
  },
);

test(
  "Login page loads and is visible",
  { tag: ["@auth", "@smoke", "@p1"] },
  async ({ page }) => {
    // Arrange
    // The login page is expected to render the standard Rolnopol auth form.

    // Act
    await page.goto("/login.html");

    // Assert
    await expect(page).toHaveTitle(/Rolnopol/);
    await expect(
      page.getByRole("heading", { name: /Login to Your User Account/i }),
    ).toHaveText("Login to Your User Account");
    await expect(page.getByLabel("Email")).toBeVisible();
    await expect(page.getByLabel("Password")).toBeVisible();
    await expect(page.getByRole("button", { name: /Login/i })).toBeVisible();
  },
);

test(
  "Register page loads and is visible",
  { tag: ["@auth", "@smoke", "@p1"] },
  async ({ page }) => {
    // Arrange
    const registrationPage = new RegistrationPage(page);

    // Act
    await registrationPage.goto();

    // Assert
    await expect(page).toHaveTitle(/Rolnopol/);
    await expect(
      page.getByRole("heading", { name: /Create Your User Account/i }),
    ).toHaveText("Create Your User Account");
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
    await expect(
      page.getByRole("button", { name: /Create Account/i }),
    ).toBeVisible();
  },
);

test(
  "User can register with valid credentials",
  { tag: ["@auth", "@smoke", "@p1"] },
  async ({ page }) => {
    // Arrange
    const email = `automation.${Date.now()}@example.com`;
    const displayName = `Automation ${Date.now().toString().slice(-4)}`;
    const registrationPage = new RegistrationPage(page);

    // Act
    await registrationPage.goto();
    await registrationPage.register(email, displayName, "Password123");

    // Assert
    await expect(
      page.getByRole("alert").filter({ hasText: /registration successful/i }),
    ).toBeVisible();
    await expect(page).toHaveURL(/\/login\.html$/);
    await expect(
      page.getByRole("heading", { name: /Login to Your User Account/i }),
    ).toBeVisible();
  },
);
