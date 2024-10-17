import cart from '../downloads/addingToCart';

const cartAdd = new cart();

describe('Sauce Demo Login Page Tests', () => {
  it('should load the login page without errors', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get("#user-name").should('be.visible');
    cy.get("#password").should('be.visible');
    cy.get("#login-button").should('be.visible');

    cy.get("#user-name").type('standard_user');
    cy.get("#password").type('secret_sauce');
    cy.get("#login-button").click({ force: true });

    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    cartAdd.btnAdd(items);
    
    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').should('be.visible').click();

    cy.get('[data-test="firstName"]').type("Josh").should('have.value', 'Josh');
    cy.get('[data-test="lastName"]').type('Palmer').should('have.value', 'Palmer');
    cy.get('[data-test="postalCode"]').type("12324").should('have.value', '12324');
    
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click();
    cy.url().should('include', '/checkout-complete.html');

    cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
    cy.get('[data-test="complete-text"]').should('be.visible').and('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');

    cy.get('[data-test="back-to-products"]').click();
    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click();
    
    cy.url().should('include', '/');
  });
});
