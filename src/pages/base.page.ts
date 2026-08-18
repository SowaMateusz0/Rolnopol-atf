import { type Page } from "@playwright/test";
import { type PageUrl } from "./page-urls";

export abstract class BasePage {
  readonly page: Page;
  protected abstract readonly url: PageUrl;

  constructor(page: Page) {
    this.page = page;
  }

  async goto() {
    await this.page.goto(this.url);
  }
}
