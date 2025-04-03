import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class LoginPage {
  readonly page: Page;
  readonly loginNameField: Locator;
  readonly loginEmailField: Locator;
  readonly loginButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.loginNameField = page.locator("input[name='name']");
    this.loginEmailField = page.locator("input[data-qa='signup-email']");
    this.loginButton = page.locator("button[data-qa='signup-button']");
  }

  async signUp() {
    const name = faker.person.firstName();
    const email = faker.internet.email();

    await this.loginNameField.fill(name);
    await this.loginEmailField.fill(email);
    await this.loginButton.click();

  }
}
