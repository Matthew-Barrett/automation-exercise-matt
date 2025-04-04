import { Page, Locator, expect } from "@playwright/test";
import { faker } from "@faker-js/faker";

export class LoginPage {
  readonly page: Page;
  readonly signupNameField: Locator;
  readonly signupEmailField: Locator;
  readonly signupButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.signupNameField = page.locator("input[name='name']");
    this.signupEmailField = page.locator("input[data-qa='signup-email']");
    this.signupButton = page.locator("button[data-qa='signup-button']");
  }

  // Enters a random name and email in the signup form and clicks the signup button
  async signUp() {
    const name = faker.person.firstName();
    const email = faker.internet.email();

    await this.signupNameField.fill(name);
    await this.signupEmailField.fill(email);
    await this.signupButton.click();
  }
}
