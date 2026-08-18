import { expect, test } from "@playwright/test";
import { HomePage } from "../src/pages/home.page";
import { LoginPage } from "../src/pages/login.page";
import { RegistrationPage } from "../src/pages/registration.page";

test(
  "Shows Rolnopol title on homepage",
  { tag: ["@health", "@smoke", "@p0"] },
  async ({ page }) => {
    // Arrange
    const homePage = new HomePage(page);

    // Act
    await homePage.goto();

    // Assert
    await expect(page).toHaveTitle(/Rolnopol/);
  },
);

test(
  "Login page loads and is visible",
  { tag: ["@auth", "@smoke", "@p1"] },
  async ({ page }) => {
    // Arrange
    const loginPage = new LoginPage(page);

    // Act
    await loginPage.goto();

    // Assert
    await expect(page).toHaveTitle(/Rolnopol/);
    await expect(loginPage.heading).toHaveText("Login to Your User Account");
    await expect(loginPage.emailInput).toBeVisible();
    await expect(loginPage.passwordInput).toBeVisible();
    await expect(loginPage.loginButton).toBeVisible();
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
    await expect(registrationPage.heading).toHaveText(
      "Create Your User Account",
    );
    await expect(registrationPage.emailInput).toBeVisible();
    await expect(registrationPage.passwordInput).toBeVisible();
    await expect(registrationPage.submitButton).toBeVisible();
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
    await expect(registrationPage.successAlert).toBeVisible();
    await expect(page).toHaveURL(/\/login\.html$/);
    const loginPage = new LoginPage(page);
    await expect(loginPage.heading).toBeVisible();
  },
);
