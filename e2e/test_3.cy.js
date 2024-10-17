import cart from '../downloads/addingToCart';

const cartAdd = new cart()

describe('Sauce Demo Login Page Tests', () => {

    it('should load the login page without errors', () => {
      cy.visit('https://www.saucedemo.com');

      cy.get("#user-name").should('be.visible');
      cy.get("#password").should('be.visible');
      cy.get("#login-button").should('be.visible');

      cy.get("#user-name").type('standard_user');
      cy.get("#password").type('secret_sauce')
      cy.get("#login-button").click({ force: true });

      const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
      cartAdd.btnAdd(items)
    });
})