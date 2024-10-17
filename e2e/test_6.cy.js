import cart from '../downloads/addingToCart';

const cartAdd = new cart();

describe('Checkout: Your Information Tests', () => {
    beforeEach(() => {
        cy.visit('https://www.saucedemo.com');

        cy.get("#user-name").type('standard_user');
        cy.get("#password").type('secret_sauce');
        cy.get("#login-button").click();

        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('[data-test="shopping-cart-link"]').click()
        cy.get('[data-test="checkout"]').click()
    });

    it('should pre-fill the correct user information', () => {
        const user = {
            firstName: "Josh",
            lastName: "Palmer",
            postalCode: "12324"
        };

        cy.get('[data-test="firstName"]').type(user.firstName);
        cy.get('[data-test="lastName"]').type(user.lastName);
        cy.get('[data-test="postalCode"]').type(user.postalCode);

        cy.get('[data-test="firstName"]').should('have.value', user.firstName);
        cy.get('[data-test="lastName"]').should('have.value', user.lastName);
        cy.get('[data-test="postalCode"]').should('have.value', user.postalCode);
        
        cy.get('[data-test="continue"]').click();
        
    });
});
