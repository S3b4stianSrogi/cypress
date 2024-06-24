import {
  firstName,
  lastName,
  generatedEmail,
  generatedPassword,
} from "../../fixtures/fakeData";

class CommonComponents {
  private pageTitle: string;
  private emailInput: string;
  private passwordInput: string;
  private firstNameInput: string;
  private lastNameInput: string;
  private passwordConfirmInput: string;
  private submitButton: string;
  private inputError: string;
  private contactInfoBox: string;
  private homePagelink: string;
  private headerLinks: string;
  private signInBtn: string;
  private searchInput: string;
  private filterOptions: string;
  private filters: string;
  private filterValue: string;
  private filterOptionTitle: string;
  private cartPreviewBtn: string;
  private viewCartBtn: string;
  private cartItemsNo: string;

  constructor() {
    this.pageTitle = "h1 span";
    this.emailInput = 'input[type="email"]';
    this.passwordInput = 'input[type="password"]';
    this.firstNameInput = 'input[name="firstname"]';
    this.lastNameInput = 'input[name="lastname"]';
    this.passwordConfirmInput = "#password-confirmation";
    this.submitButton = 'button[type="submit"].action';
    this.inputError = '[id$="-error"]';
    this.contactInfoBox = ".box.box-information";
    this.homePagelink = ".logo";
    this.headerLinks = ".panel.header .header.links li";
    this.signInBtn = "#send2";
    this.searchInput = "#search";
    this.filters = "#narrow-by-list div";
    this.filterOptions = ".filter-options-content";
    this.filterValue = "span.filter-value";
    this.filterOptionTitle = ".filter-options-title";
    this.cartPreviewBtn = ".showcart";
    this.viewCartBtn = ".viewcart";
    this.cartItemsNo = ".counter-number";
  }

  generateUserData() {
    const email = generatedEmail;
    const password = generatedPassword;
    const name = firstName;
    const familyName = lastName;
    Cypress.env("generatedEmail", email);
    Cypress.env("generatedPassword", password);
    Cypress.env("generatedName", name);
    Cypress.env("generatedLastName", familyName);
    return this;
  }

  veryfiNumberOfItemsInCart(itemsNumber) {
    cy.get(this.cartPreviewBtn)
      .find(this.cartItemsNo)
      .should("be.visible")
      .and("have.have.text", itemsNumber);
    return this;
  }

  clickCartPreviewBtn() {
    cy.get(this.cartPreviewBtn).should("be.be.visible").click();
    return this;
  }

  clickViewCartBtn() {
    cy.get(this.viewCartBtn).should("be.be.visible").click();
    return this;
  }

  verifyTitle(title) {
    cy.get(this.pageTitle).should("have.text", title).and("be.visible");
    return this;
  }

  typeFirstName(firstName) {
    cy.get(this.firstNameInput).should("be.be.visible").type(firstName);
    return this;
  }

  typeLastName(lastName) {
    cy.get(this.lastNameInput).type(lastName);
    return this;
  }

  typeEmail(email) {
    cy.get("label")
      .contains("Email")
      .parents(".field.required")
      .find("input")
      .type(email);
    return this;
  }

  typePassword(password) {
    cy.get("label")
      .contains("Password")
      .parents(".field.required")
      .find("input")
      .type(password, { log: false });
    return this;
  }

  typePasswordConfirmation(password) {
    cy.get(this.passwordConfirmInput)
      .should("be.be.visible")
      .type(password, { log: false });
    return this;
  }

  typeEmailAndPassword(email, password) {
    this.typeEmail(email);
    this.typePassword(password);
    this.typePasswordConfirmation(password);
    return this;
  }
  clickSubmitButton() {
    cy.get(this.submitButton).should("be.be.visible").click();
    return this;
  }

  verifyMessage(text) {
    cy.get(".message-success").should("have.text", text).and("be.visible");
    return this;
  }

  verifyInputErrors(errorMessage, errorNumbers: number) {
    cy.get(this.inputError)
      .each(($el) => {
        cy.wrap($el).should("exist").and("have.text", errorMessage);
      })
      .then(($els) => {
        expect($els.length).to.equal(errorNumbers);
      });
    return this;
  }

  verifyContactInformation(name, lastname, email) {
    cy.get(this.contactInfoBox).should("contain.text", name + " " + lastname);
    cy.get(this.contactInfoBox).should("contain.text", email);
    return this;
  }

  clickOnLogo() {
    cy.get(this.homePagelink).should("be.be.visible").click();
    return this;
  }

  clickHeaderLink(linkName: string) {
    cy.get(this.headerLinks).contains(linkName).click();
    return this;
  }

  expandHeaderLink() {
    cy.get('ul.header.links button[data-action="customer-menu-toggle"]')
      .first()
      .click();
    return this;
  }

  verifyFullName(name, lastname) {
    cy.get(this.headerLinks).should("contain.text", name + " " + lastname);
    return this;
  }

  clickSignInBtn() {
    cy.get(this.signInBtn).should("be.be.visible").click();
    return this;
  }
  searchForProduct(product) {
    cy.get(this.searchInput).type(`${product}{enter}`);
    return this;
  }

  selectFilter(filterName, filterOptions) {
    cy.get(this.filterOptionTitle)
      .first()
      .should("have.attr", "aria-expanded", "false");
    cy.get(this.filters).contains(filterName).should("be.visible").click();

    if (filterName === "Color") {
      cy.get(`.filter-options-item [option-label="${filterOptions}"]`)
        .should("be.visible")
        .click();
    } else {
      cy.get(this.filterOptions)
        .find("a")
        .contains(filterOptions)
        .should("be.visible")
        .click({ force: true });
    }
    this.verifySelectedFilter(filterName, filterOptions);
    return this;
  }

  verifySelectedFilter(label, filterValue) {
    cy.get(".filter-current")
      .find(".items .filter-label")
      .contains(label)
      .should("be.be.visible")
      .siblings("span")
      .should("have.text", filterValue);
    return this;
  }

  verifyFilteredProductName(productName) {
    cy.get("div.product-item-info")
      .find("strong a")
      .should("be.be.visible")
      .invoke("text")
      .then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(productName);
      });
    return this;
  }

  openProductDetails(productName) {
    cy.get("div.product-item-info")
      .find("strong a")
      .invoke("text")
      .then((text) => {
        const trimmedText = text.trim();
        expect(trimmedText).to.equal(productName);
      });
    return this;
  }
  addProductToCart(productName, color?, size?) {
    cy.get("li.item.product.product-item")
      .should("be.be.visible")
      .each(($el) => {
        const textProduct = $el.find(".product-item-link").text().trim();
        cy.wrap($el)
          .find(".product-item-link")
          .should("be.visible")
          .should("exist");
        cy.wrap($el)
          .find('.swatch-option.text.selected[option-label="XL"]')
          .should("exist");
        cy.wrap($el)
          .find(".swatch-option.color.selected")
          .should("have.attr", "option-label", "Blue");
        if (textProduct === productName) {
          cy.wrap($el).find(".product-item-link").click();
          return false;
        }
      });
    return this;
  }

  verifyUsedFilters(color, size) {
    cy.get("li.item.product.product-item")
      .should("be.be.visible")
      .each(($el) => {
        cy.wrap($el)
          .find(`.swatch-option.text.selected[option-label="${size}"]`)
          .should("exist");
        cy.wrap($el)
          .find(".swatch-option.color.selected")
          .should("have.attr", "option-label", `${color}`);
      });
    return this;
  }

  selectSize(size) {
    cy.get(".swatch-option.text")
      .contains(size)
      .should("be.be.visible")
      .click();
    return this;
  }

  selectColor(color) {
    cy.get(`.swatch-option.color[aria-label="${color}"]`)
      .should("be.be.visible")
      .click();
    return this;
  }
}

export default CommonComponents;
