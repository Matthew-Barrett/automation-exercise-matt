/*Launch browser
2. Navigate to url 'http://automationexercise.com'
3. Verify that home page is visible successfully
4. Click 'Signup / Login' button
5. Fill all details in Signup and create account
6. Verify 'ACCOUNT CREATED!' and click 'Continue' button
7. Verify ' Logged in as username' at top
8. Add products to cart
9. Click 'Cart' button
10. Verify that cart page is displayed
11. Click Proceed To Checkout
12. Verify Address Details and Review Your Order
13. Enter description in comment text area and click 'Place Order'
14. Enter payment details: Name on Card, Card Number, CVC, Expiration date
15. Click 'Pay and Confirm Order' button
16. Verify success message 'Your order has been placed successfully!'
17. Click 'Delete Account' button
18. Verify 'ACCOUNT DELETED!' and click 'Continue' button*/

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

test("15 - Place Order - Register before Checkout", async ({ page }) => {
  const homePage = new HomePage(page);
  const cartPage = new CartPage(page);
  const loginPage = new LoginPage(page);
  const checkoutPage = new CheckoutPage(page);
  const accountPage = new AccountPage(page);
  const accountCreationPage = new AccountCreationPage(page);
  await homePage.visit();
  await homePage.verifyHomePage();
  await homePage.navigateToLoginPage();
  await loginPage.signUp();
  await accountCreationPage.fillSignupForm();
  await accountCreationPage.submitSignupForm();
  await accountCreationPage.verifyAccountCreated();
  await accountCreationPage.continueToHomePage();
  await homePage.verifyUserIsLoggedIn();
  await homePage.buyProduct("Blue Top");
  await homePage.goToCart();
  await cartPage.verifyCartPage();
  await cartPage.proceedToCheckout();
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