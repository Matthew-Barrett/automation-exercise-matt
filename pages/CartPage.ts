import { Page, Locator, expect } from "@playwright/test";

export class CartPage {
  readonly page: Page;
  readonly proceedToCheckoutButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.proceedToCheckoutButton = page.locator(".btn.btn-default.check_out");

  }

  // Verifies that the cart page is displayed by checking the URL
  async verifyCartPage() {
    await expect(this.page).toHaveURL(/\/view_cart/);
  }

  // Clicks the "Proceed to Checkout" button
  async proceedToCheckout() {
    await this.proceedToCheckoutButton.click();
  }
}
