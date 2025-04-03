import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.locator(".btn.btn-default.check_out");

  }

  async verifyCartPage() {
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
