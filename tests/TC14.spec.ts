import { test, expect, Browser } from "@playwright/test";
import { HomePage } from "../pages/HomePage";
import { CartPage } from "../pages/CartPage";
import { LoginPage } from "../pages/LoginPage";
import { CheckoutPage } from "../pages/CheckoutPage";
import { AccountPage } from "../pages/AccountPage";
import { faker } from "@faker-js/faker";
import { AccountCreationPage } from "../pages/AccountCreationPage";


test.beforeEach(async ({ browser }) => {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.setViewportSize({ width: 1920, height: 1080 });

});

test("TC14 - Place Order - Register while Checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);
  const accountPage = new AccountPage(page);
  const accountCreationPage = new AccountCreationPage(page);
  await homePage.visit();
  await homePage.verifyHomePage();
  await homePage.buyProduct("Blue Top");
  await homePage.goToCart();
  await cartPage.verifyCartPage();
  await cartPage.proceedToCheckout();
  await homePage.goToLoginPage();
  await loginPage.signUp();
  await accountCreationPage.fillSignupForm();
  await accountCreationPage.submitSignupForm();
  await accountCreationPage.verifyAccountCreated();
  await accountCreationPage.continueToHomePage();
  await homePage.verifyUserIsLoggedIn();
  await homePage.navigateToCart();
  await cartPage.proceedToCheckout();
  await checkoutPage.verifyCheckoutDetails();
  await checkoutPage.enterOrderDetails("Please deliver quickly!");
  await checkoutPage.enterPaymentDetails(
    faker.person.fullName(),
    faker.finance.creditCardNumber(),
    faker.finance.creditCardCVV(),
    "12/25"
  );

  await expect(page.locator(".title.text-center").first()).toHaveText("Order Placed!");
  await accountPage.deleteAccount();
});


