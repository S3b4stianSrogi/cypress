class HomePage {
  private headerLinks: string;
  private navigation: string;
  private subCategorySideBar: string;

  constructor() {
    this.headerLinks = ".panel.header .header.links li";
    this.navigation = "#ui-id-2";
    this.subCategorySideBar = ".sidebar-main";
  }

  clickHeaderLink(linkName: string) {
    cy.get(this.headerLinks).contains(linkName).click();
    return this;
  }
  navigateToCategory(mainCategory) {
    cy.get(this.navigation).find("li span").contains("Men").click();
  }

  selectSubCategory(name) {
    cy.get(this.subCategorySideBar).find("li").contains(name).click();
  }
}

export default HomePage;
