import { type Locator, type Page } from "@playwright/test";

export class RegistrationPage {
  readonly page: Page;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.emailInput = page.getByTestId("email-input");
    this.displayNameInput = page.getByTestId("display-name-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("register-submit-btn");
  }

  async goto() {
    await this.page.goto("/register.html");
  }

  async register(email: string, displayName: string, password: string) {
    await this.emailInput.fill(email);
    await this.displayNameInput.fill(displayName);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
