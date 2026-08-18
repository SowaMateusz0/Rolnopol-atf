import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "./base.page";
import { PAGE_URLS } from "./page-urls";

export class LoginPage extends BasePage {
  protected readonly url = PAGE_URLS.login;
  readonly heading: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole("heading", {
      name: /Login to Your User Account/i,
    });
    this.emailInput = page.getByLabel("Email");
    this.passwordInput = page.getByLabel("Password");
    this.loginButton = page.getByRole("button", { name: /Login/i });
  }
}
