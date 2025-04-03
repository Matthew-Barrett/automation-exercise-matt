export const locators = {
    homePage: {
      productCard: ".single-products",
      addToCartButton: ".add-to-cart"
    },
    cartPage: {
      proceedToCheckout: "text=Proceed To Checkout",
      cartButton: "a[href='/view_cart']"
    },
    loginPage: {
      signupButton: "a[href='/login']",
      usernameField: "[data-qa='signup-name']",
      emailField: "[data-qa='signup-email']",
      signupSubmit: "[data-qa='signup-button']"
    },
    checkoutPage: {
      placeOrderButton: "text=Place Order",
      nameOnCard: "[name='name_on_card']",
      cardNumber: "[name='card_number']",
      cvc: "[name='cvc']",
      expiration: "[name='expiry']",
      payButton: "text=Pay and Confirm Order"
    },
    accountPage: {
      deleteAccountButton: "text=Delete Account",
      accountDeletedMessage: "text=ACCOUNT DELETED!"
    }
  };
  