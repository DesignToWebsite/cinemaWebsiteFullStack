const { defineConfig } = require("cypress");

module.exports = defineConfig({
  
  e2e: {
    baseUrl: "http://localhost:5173",
    defaultCommandTimeout: 700000,
    specPattern: 'cypress/integration',
    viewportHeight: 550,
    viewportHeight: 660,
    experimentalStudio: true,
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
