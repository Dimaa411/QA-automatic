import cart from '../downloads/addingToCart';

const cartAdd = new cart();

describe('Sauce Demo Checkout Tests', () => {
  it('should complete the checkout process and validate the completion page', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get("#user-name").should('be.visible').type('standard_user');
    cy.get("#password").should('be.visible').type('secret_sauce');
    cy.get("#login-button").click({ force: true });

    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    cartAdd.btnAdd(items);

    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').should('be.visible').click();

    cy.get('[data-test="firstName"]').type("Josh");
    cy.get('[data-test="lastName"]').type('Palmer');
    cy.get('[data-test="postalCode"]').type("12324");
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();  

    cy.url({ timeout: 10000 }).should('include', '/checkout-complete.html');

    cy.get('[data-test="complete-header"]', { timeout: 10000 })
      .should('have.text', 'Thank you for your order!');

    cy.get('[data-test="complete-text"]', { timeout: 10000 })
      .should('be.visible')
      .and('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    cy.get('[data-test="back-to-products"]').click();
  
    cy.get('#react-burger-menu-btn').click();
    cy.wait(500);

    cy.get('[data-test="logout-sidebar-link"]').click();
    cy.url().should('include', '/');
  });
});