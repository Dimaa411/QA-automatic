describe('Sauce Demo Interaction Tests', () => {
  it('should successfully log in and complete the checkout process', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get("#user-name").should('be.visible').then(() => {
      cy.get("#password").should('be.visible');
      cy.get("#login-button").should('be.visible');
    });

    cy.get("#user-name").type('standard_user');
    cy.get("#password").type('secret_sauce');

    cy.get("#login-button").click().then(() => {
 
      cy.url().should('include', '/inventory.html').then(() => {
        cy.get('.title').should('have.text', 'Products');
      });
    });

    cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
    cy.get('[data-test="add-to-cart-sauce-labs-bike-light"]').click();

    cy.get('[data-test="shopping-cart-link"]').click().then(() => {
      cy.get('.cart_item').should('have.length', 2);
    });

    cy.get('[data-test="checkout"]').click();
    cy.get('[data-test="firstName"]').type("Josh");
    cy.get('[data-test="lastName"]').type('Palmer');
    cy.get('[data-test="postalCode"]').type("12324");
    cy.get('[data-test="continue"]').click();

    cy.get('[data-test="finish"]').click().then(() => {
      cy.url().should('include', '/checkout-complete.html').then(() => {
        cy.get('[data-test="complete-header"]').should('have.text', 'Thank you for your order!');
        cy.get('[data-test="complete-text"]').should('be.visible')
          .and('contain', 'Your order has been dispatched, and will arrive just as fast as the pony can get there!');
      });
    });

    cy.get('[data-test="back-to-products"]').click();

    cy.get('#react-burger-menu-btn').click();
    cy.get('[data-test="logout-sidebar-link"]').click().then(() => {
      cy.url().should('include', '/');
    });
  });
});
