module.exports = {
  // 60 seconds for page load timeout
  pageLoadTimeout: 60000,

  e2e: {
    chromeWebSecurity: false,  // This should be outside of setupNodeEvents
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
};
