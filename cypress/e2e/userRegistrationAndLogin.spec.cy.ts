import CommonComponents from "./pages/common.components";
import HomePage from "./pages/homePage";
import RegistrationPage from "./pages/registrationPage";

describe("Register and Login", () => {
  const homePage = new HomePage();
  const commonComponents = new CommonComponents();
  const registrationPage = new RegistrationPage();

  before(() => {
    registrationPage.interceptPUTUserRegistration();
    commonComponents.generateUserData();
  });

  beforeEach(() => {
    cy.visit("/");
  });
  it("Check errors on empty inputs", () => {
    homePage.clickHeaderLink("Create an Account");
    registrationPage.clickCreateAccountBtn();
    commonComponents.verifyInputErrors("This is a required field.", 5);
  });

  it("Check errors on wrong email", () => {
    homePage.clickHeaderLink("Create an Account");
    commonComponents
      .typeFirstName("23")
      .typeLastName("32")
      .typeEmailAndPassword("1", Cypress.env("generatedPassword"));
    registrationPage.clickCreateAccountBtn();
    commonComponents.verifyInputErrors(
      "Please enter a valid email address (Ex: johndoe@domain.com).",
      1,
    );
  });

  it("Wrong password validations - lenght do not meet requirements", () => {
    homePage.clickHeaderLink("Create an Account");
    commonComponents
      .typeFirstName("23")
      .typeLastName("32")
      .typeEmailAndPassword("test@test.com", "1");
    registrationPage.clickCreateAccountBtn();
    commonComponents.verifyInputErrors(
      "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.",
      1,
    );
  });

  it("Wrong password validations - classes do not meet requirements", () => {
    homePage.clickHeaderLink("Create an Account");

    commonComponents
      .typeFirstName("23")
      .typeLastName("32")
      .typeEmailAndPassword("test@test.com", "12345678");
    registrationPage.clickCreateAccountBtn();
    commonComponents.verifyInputErrors(
      "Minimum of different classes of characters in password is 3. Classes of characters: Lower Case, Upper Case, Digits, Special Characters.",
      1,
    );
  });

  it("Check errors on when passwords do not match", () => {
    homePage.clickHeaderLink("Create an Account");

    commonComponents
      .typeFirstName("23")
      .typeLastName("32")
      .typeEmail(Cypress.env("generatedEmail"))
      .typePassword(Cypress.env("generatedPassword"))
      .typePasswordConfirmation("123458");
    registrationPage.clickCreateAccountBtn();
    commonComponents.verifyInputErrors("Please enter the same value again.", 1);
  });
  it("Register new user", () => {
    homePage.clickHeaderLink("Create an Account");
    commonComponents
      .verifyTitle("Create New Customer Account")
      .typeFirstName(Cypress.env("generatedName"))
      .typeLastName(Cypress.env("generatedLastName"))
      .typeEmailAndPassword(
        Cypress.env("generatedEmail"),
        Cypress.env("generatedPassword"),
      );
    registrationPage
      .interceptPUTUserRegistration()
      .clickCreateAccountBtn()
      .verifyPUTUserEdit(302);
    commonComponents
      .verifyMessage("\nThank you for registering with Main Website Store.\n")
      .verifyTitle("My Account")
      .verifyContactInformation(
        Cypress.env("generatedName"),
        Cypress.env("generatedLastName"),
        Cypress.env("generatedEmail"),
      )
      .verifyFullName(
        Cypress.env("generatedName"),
        Cypress.env("generatedLastName"),
      )
      .expandHeaderLink()
      .clickHeaderLink("Sign Out")
      .verifyTitle("You are signed out")
      .clickOnLogo();
  });

  it("Log in previously registered user", () => {
    homePage.clickHeaderLink("Sign In");
    commonComponents
      .verifyTitle("Customer Login")
      .typeEmail(Cypress.env("generatedEmail"))
      .typePassword(Cypress.env("generatedPassword"))
      .clickSignInBtn()
      .verifyFullName(
        Cypress.env("generatedName"),
        Cypress.env("generatedLastName"),
      );
    cy.url().should("eq", "https://magento.softwaretestingboard.com/");
    commonComponents
      .expandHeaderLink()
      .clickHeaderLink("Sign Out")
      .verifyTitle("You are signed out");
  });
});
