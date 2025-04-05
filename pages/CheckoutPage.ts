import { Page, Locator, expect } from "@playwright/test";

export class CheckoutPage {
    readonly page: Page;
    readonly commentTextArea: Locator;
    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payAndConfirmButton: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.commentTextArea = page.locator("textarea[name='message']");
        this.placeOrderButton = page.locator("button.place-order");
        this.nameOnCard = page.locator("input[name='name_on_card']");
        this.cardNumber = page.locator("input[name='card_number']");
        this.cvc = page.locator("input[name='cvc']");
        this.expiryMonth = page.locator("input[name='expiry_month']");
        this.expiryYear = page.locator("input[name='expiry_year']");
        this.placeOrderButton = page.locator('a[href="/payment"]');
        this.payAndConfirmButton = page.locator("#submit");
    }

    // Verify the Address Details Bar has text
    // TODO: Add a method to verify the actual address details
    async verifyCheckoutDetails() {
        await expect(this.page.locator(".step-one").first()).toHaveText("Address Details");
    }

    // Enters a comment in the text area and clicks the "Place Order" button
    async enterOrderDetails(comment: string) {
        await this.commentTextArea.fill(comment);
        await this.placeOrderButton.click();
    }

    async placeOrder() {
        await this.placeOrderButton.click();
    }

    // Enters payment details and clicks the "Pay and Confirm Order" button
    async enterPaymentDetails(name: string, card: string, cvc: string, expiry: string) {
        await this.nameOnCard.fill(name);
        await this.cardNumber.fill(card);
        await this.cvc.fill(cvc);
        await this.expiryMonth.fill(expiry);    
        await this.expiryYear.fill(expiry);
        await this.payAndConfirmButton.click();
    }

    async getOrderPlacedSuccessMessage() {
        return await this.page.locator(".title.text-center").first().textContent();
    }

    async getAddressDetailsText() {
        return await this.page.locator(".step-one").first().textContent();
    }
}