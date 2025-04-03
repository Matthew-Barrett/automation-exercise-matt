import { Page, Locator, expect } from "@playwright/test";

export class AccountPage {
  readonly page: Page;
  readonly deleteAccountButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.deleteAccountButton = page.locator("a[href='/delete_account']");
  }

  async verifyLoggedIn(username: string) {
    await expect(this.page.locator(".logged-user")).toHaveText(`Logged in as ${username}`);
  }

  async deleteAccount() {
    await this.deleteAccountButton.click();
    await expect(this.page.locator("h2").first()).toHaveText("Account Deleted!");
  }
}
