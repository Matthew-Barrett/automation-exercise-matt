import { Page, Locator } from '@playwright/test';
import { faker } from '@faker-js/faker';

export class AccountCreationPage {
  readonly page: Page;
  readonly nameInput: Locator;
  readonly emailInput: Locator;
  readonly signupButton: Locator;
  readonly titleRadio: Locator;
  readonly passwordInput: Locator;
  readonly lastnameInput: Locator;
  readonly firstnameInput: Locator;
  readonly addressInput: Locator;
  readonly countryInput: Locator;
  readonly stateInput: Locator;
  readonly cityInput: Locator;
  readonly registerButton: Locator;
  readonly zipcodeInput: Locator;
  readonly mobileInput: Locator;

  constructor(page: Page) {
    this.page = page;
    this.nameInput = page.locator('input[name="name"]');
    this.emailInput = page.locator('input[name="email"]');
    this.signupButton = page.locator('button[data-qa="signup-button"]');
    this.titleRadio = page.locator('input[type="radio"][name="title"]');
    this.passwordInput = page.locator('input[name="password"]');
    this.firstnameInput = page.locator('input[name="first_name"]');
    this.lastnameInput = page.locator('input[name="last_name"]');
    this.addressInput = page.locator('input[name="address1"]');
    this.countryInput = page.locator('select[name="country"]');
    this.stateInput = page.locator('input[name="state"]');
    this.cityInput = page.locator('input[name="city"]');
    this.zipcodeInput = page.locator('input[name="zipcode"]');
    this.mobileInput = page.locator('input[name="mobile_number"]');
    this.registerButton = page.locator('.btn.btn-default').first();
  }

  // Generate random user data using Faker
  private generateRandomUserData() {
    return {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      firstName: faker.person.firstName(),
      lastName: faker.person.lastName(),
      address: faker.location.streetAddress(), 
      state: faker.location.state(),
      city: faker.location.city(),
      zipcode: faker.location.zipCode(),
      mobile: faker.phone.number()
    };
  }

  async fillSignupForm() {
    const userData = this.generateRandomUserData();
    await this.titleRadio.first().check();
    await this.nameInput.fill(userData.name);
    await this.passwordInput.fill(userData.password);
    await this.firstnameInput.fill(userData.firstName);
    await this.lastnameInput.fill(userData.lastName);
    await this.addressInput.fill(userData.address);
    await this.countryInput.selectOption({ value: 'India' });
    await this.stateInput.fill(userData.state);
    await this.cityInput.fill(userData.city);
    await this.zipcodeInput.fill(userData.zipcode);
    await this.mobileInput.fill(userData.mobile);

  }

  async submitSignupForm() {
    await this.registerButton.click();
  }

  // Complete the signup process by filling and submitting the form
  async completeSignup() {
    await this.fillSignupForm();
    await this.submitSignupForm();
  }

  async verifyAccountCreated() {
    await this.page.waitForSelector("h2:has-text('Account Created!')");
    await this.page.waitForSelector('p:has-text("Congratulations! Your new account has been successfully created!")');
  }

  async continueToHomePage(){
    await this.page.click('.btn.btn-primary');
    
  }
}
