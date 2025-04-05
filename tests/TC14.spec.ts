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
  await expect(homePage.page).toHaveURL("https://automationexercise.com/");
  await homePage.buyProduct("Blue Top");
  await homePage.goToCart();
  await expect(cartPage.page).toHaveURL(/\/view_cart/);
  await cartPage.proceedToCheckout();
  await homePage.goToLoginPage();
  await loginPage.signUp();
  await accountCreationPage.fillSignupForm();
  await accountCreationPage.submitSignupForm();
  const accountCreatedText = await accountCreationPage.getAccountCreatedMessage();
  expect(accountCreatedText).toContain("Account Created!");
  await accountCreationPage.continueToHomePage();
  const userLoggedInIcon = await homePage.userLoggedInIcon();
  expect(userLoggedInIcon).toBeVisible();
  await homePage.navigateToCart();
  await cartPage.proceedToCheckout();
  const addressDetailsText = await checkoutPage.getAddressDetailsText();
  expect(addressDetailsText).toContain("Address Details");
  await checkoutPage.enterOrderDetails("Test - Order Comment");
  await checkoutPage.enterPaymentDetails(
    faker.person.fullName(),
    faker.finance.creditCardNumber(),
    faker.finance.creditCardCVV(),
    "12/25"
  );
  const orderPlacedSuccessMessage = await checkoutPage.getOrderPlacedSuccessMessage();
  expect(orderPlacedSuccessMessage).toContain("Order Placed!");
  await accountPage.deleteAccount();
  const accountDeletedMessage = await accountPage.getAccountDeletedMessage();
  expect(accountDeletedMessage).toContain("Account Deleted!");
});


