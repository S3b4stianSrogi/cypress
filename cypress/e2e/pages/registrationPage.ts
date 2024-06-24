class RegistrationPage {
  private createaAccountBtn: string;
  constructor() {
    this.createaAccountBtn = 'button[title="Create an Account"]';
  }

  clickCreateAccountBtn() {
    cy.get(this.createaAccountBtn).click();
    return this;
  }

  interceptPUTUserRegistration() {
    cy.intercept({
      method: "POST",
      url: "https://magento.softwaretestingboard.com/customer/account/createpost/",
    }).as("registerUserReqPUT");
    return this;
  }

  verifyPUTUserEdit(statusCode: number) {
    cy.wait("@registerUserReqPUT").then(({ response }) => {
      expect(response.statusCode).to.equal(statusCode);
    });
    return this;
  }
}

export default RegistrationPage;
