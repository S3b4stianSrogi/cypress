class CartPage {
  private cartItemsTable: string;
  private itemDetails: string;
  private productName: string;
  private priceCell: string;
  private subtotalCell: string;
  private qtyCell: string;
  constructor() {
    this.cartItemsTable = "tbody.cart.item tr.item-info";
    this.itemDetails = ".item-options dt";
    this.productName = ".product-item-name a";
    this.priceCell = 'td[data-th="Price"] .price';
    this.subtotalCell = 'td[data-th="Subtotal"] .price';
    this.qtyCell = 'td[data-th="Qty"] input[type="number"]';
  }

  verifyCartItemByName = (
    name: string,
    size: string,
    color: string,
    price: string,
    qty: number,
    subtotal: string,
  ) => {
    cy.get(this.cartItemsTable).each(($el) => {
      cy.wrap($el).within(() => {
        cy.get(this.productName).then(($name) => {
          if ($name.text().trim() === name) {
            cy.get(this.itemDetails)
              .contains("Size")
              .next("dd")
              .should("contain.text", size);

            cy.get(this.itemDetails)
              .contains("Color")
              .next("dd")
              .should("contain.text", color);

            cy.get(this.priceCell).should("contain.text", price);
            cy.get(this.qtyCell).should("have.value", qty.toString());
            cy.get(this.subtotalCell).should("contain.text", subtotal);
          }
        });
      });
    });
  };
}

export default CartPage;
