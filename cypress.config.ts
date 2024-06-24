import { defineConfig } from "cypress";

export default defineConfig({
  e2e: {
    baseUrl: "https://magento.softwaretestingboard.com",
    setupNodeEvents(on, config) {},
    specPattern: "cypress/e2e/*.ts",
  },
});
