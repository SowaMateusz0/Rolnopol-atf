import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

export class RegistrationPage extends BasePage {
  protected readonly url = PAGE_URLS.registration;
  readonly emailInput: Locator;
  readonly displayNameInput: Locator;
  readonly passwordInput: Locator;
  readonly submitButton: Locator;
  readonly heading: Locator;
  readonly successAlert: Locator;
  readonly emailError: Locator;
  readonly passwordError: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.getByTestId("email-input");
    this.displayNameInput = page.getByTestId("display-name-input");
    this.passwordInput = page.getByTestId("password-input");
    this.submitButton = page.getByTestId("register-submit-btn");
    this.heading = page.getByRole("heading", {
      name: /Create Your User Account/i,
    });
    this.successAlert = page
      .getByRole("alert")
      .filter({ hasText: /registration successful/i });
    this.emailError = page.locator("#email ~ .form__error");
    this.passwordError = page.locator("#password ~ .form__error");
  }

  async register(email: string, displayName: string, password: string) {
    await this.emailInput.fill(email);
    await this.displayNameInput.fill(displayName);
    await this.passwordInput.fill(password);
    await this.submitButton.click();
  }
}
