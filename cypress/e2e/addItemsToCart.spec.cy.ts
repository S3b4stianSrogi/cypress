import CartPage from "./pages/cartPage";
import CommonComponents from "./pages/common.components";
import HomePage from "./pages/homePage";
import ItemDetailsPage from "./pages/itemDetailsPage";

describe("Register and Login", () => {
  const homePage = new HomePage();
  const commonComponents = new CommonComponents();
  const itemDetailsPage = new ItemDetailsPage();
  const cartPage = new CartPage();

  before(() => {
    cy.visit("/");
  });
  it("add item to the cart", () => {
    homePage.navigateToCategory("Men");
    homePage.selectSubCategory("Tanks");
    commonComponents
      .selectFilter("Size", "XL")
      .selectFilter("Color", "Blue")
      .verifyUsedFilters("Blue", "XL")
      .addProductToCart("Atlas Fitness Tank")
      .selectSize("XL")
      .selectColor("Blue");
    itemDetailsPage.clickAddTocart();
    commonComponents
      .veryfiNumberOfItemsInCart("1")
      .clickCartPreviewBtn()
      .clickViewCartBtn();
    commonComponents.verifyTitle("Shopping Cart");
    cartPage.verifyCartItemByName(
      "Atlas Fitness Tank",
      "XL",
      "Blue",
      "$18.00",
      1,
      "$18.00",
    );
  });
});
