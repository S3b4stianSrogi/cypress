import CommonComponents from "./pages/common.components";

describe("Register and Login", () => {
  const commonComponents = new CommonComponents();

  before(() => {
    cy.visit("/");
  });
  it("Search for product", () => {
    commonComponents
      .searchForProduct("Jacket")
      .selectFilter("Category", "Gear")
      .verifySelectedFilter("Category", "Gear")
      .verifyFilteredProductName("Compete Track Tote");
  });
});
