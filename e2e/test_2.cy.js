describe('Sauce Demo Login Page Tests', () => {

  it('should load the login page without errors', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get("#user-name").should('be.visible');
    cy.get("#password").should('be.visible');
    cy.get("#login-button").should('be.visible');
  });

  it('should log in successfully with valid credentials', () => {
    cy.visit('https://www.saucedemo.com');

    cy.get("#user-name").type("standard_user");
    cy.get("#password").type("secret_sauce");
    cy.get("#login-button").click({ force: true });

   
    cy.url().should('include', '/inventory.html');
    cy.get('.inventory_list').should('be.visible');
  });

  it('should not log in with invalid credentials and show an error message', () => {
    cy.visit('https://www.saucedemo.com');

  
    cy.get("#user-name").type("invalid_user");
    cy.get("#password").type("invalid_password");
    cy.get("#login-button").click({ force: true });

  
    cy.get('.error-message-container')
      .should('be.visible')
      .and('contain', 'Epic sadface: Username and password do not match any user in this service');
  });
});
