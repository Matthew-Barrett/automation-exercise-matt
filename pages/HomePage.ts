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
        //await page.locator("#checkoutModal a[href='/login']").click();

    }

    async visit() {
        await this.page.goto("https://automationexercise.com/");
    }

    async verifyHomePage() {
        await expect(this.page).toHaveURL("https://automationexercise.com/");
        await expect(this.page.locator("#slider")).toBeVisible();
    }

    async navigateToLoginPage() {
        await this.loginNav.click();    
    }


    async buyProduct(productName: string) {
        // Locate the product by its name
        const productCard = this.page.locator(`.single-products:has-text("${productName}")`).first();

        // Ensure the product is found
        if (await productCard.count() === 0) {
            throw new Error(`Product "${productName}" not found.`);
        }

        // Hover over the product card to reveal the overlay
        await productCard.hover();

        // Click "Add to Cart" button within the overlay
        await productCard.locator('.overlay-content .add-to-cart').first().click();

        // Wait for the modal confirmation message
        await this.page.waitForSelector(`.modal-body p:text("Your product has been added to cart.")`);

        // Click "Continue Shopping" to dismiss the modal
        //await this.page.locator(`.modal-body p a:has-text("Continue Shopping")`).first().click();
    }


    async goToCart() {
        await this.cartButton.click();
    }

    async navigateToCart() {
        await this.cartNav.click();
    }
   

    async goToLoginPage() {
        await this.signUpLoginButton.click();
    }

    async verifyUserIsLoggedIn() {
        const userNav = await this.page.locator('.fa.fa-user');
        await expect(userNav).toBeVisible();
      }
      
}
