import { Page, Locator, expect } from "@playwright/test";

export class HomePage {
    readonly page: Page;
    readonly productContainer: Locator;
    readonly cartButton: Locator;
    readonly cartNav: Locator;
    readonly signUpLoginButton: Locator;
    readonly loginNav: Locator;

    constructor(page: Page) {
        this.page = page;
        this.productContainer = page.locator(".single-products");
        this.cartButton = page.locator(".modal-content").locator("a[href='/view_cart']").first();
        this.cartNav = page.locator("a:has-text(' Cart')").first();
        this.signUpLoginButton = page.locator("#checkoutModal a[href='/login']");
        this.loginNav = page.locator("a[href='/login']");

    }

    async visit() {
        await this.page.goto('/');
    }

    // Verify the home page is displayed by checking the URL and the presence of the slider
    async verifyHomePage() {
        await expect(this.page).toHaveURL("https://automationexercise.com/");
        await expect(this.page.locator("#slider")).toBeVisible();
    }

    async navigateToLoginPage() {
        await this.loginNav.click();
    }

    // Buys a product by its name
    // This method locates the product card by its name, hovers over it to reveal the overlay, and clicks the "Add to Cart" button.
    async buyProduct(productName: string) {
        const productCard = this.page.locator(`.single-products:has-text("${productName}")`).first();
        if (await productCard.count() === 0) {
            throw new Error(`Product "${productName}" not found.`);
        }
        await productCard.hover();
        await productCard.locator('.overlay-content .add-to-cart').first().click();
        await this.page.waitForSelector(`.modal-body p:text("Your product has been added to cart.")`);
    }

    async goToCart() {
        await this.cartButton.click();
    }

    // Go to Cart via the main Navigation bar
    async navigateToCart() {
        await this.cartNav.click();
    }

    // Clicks the signup/login button on the popup modal element to navigate to the login page
    async goToLoginPage() {
        await this.signUpLoginButton.click();
    }

    async userLoggedInIcon() {
        return this.page.locator('.fa.fa-user');
    }

    // Verifyies that the user element is visible in the navigation bar, indicating that the user is logged in
    async verifyUserIsLoggedIn() {
        const userNav = await this.page.locator('.fa.fa-user');
        await expect(userNav).toBeVisible();
    }

}
