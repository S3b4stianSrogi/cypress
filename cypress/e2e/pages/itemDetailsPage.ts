class ItemDetailsPage {
  private addToCartBtn;
  constructor() {
    this.addToCartBtn = "#product-addtocart-button";
  }

  clickAddTocart() {
    cy.get(this.addToCartBtn).click();
  }
}

export default ItemDetailsPage;
