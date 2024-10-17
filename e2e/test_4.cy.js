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

    cy.get('.cart_item_label').should('have.length', items.length).then(($cartItems) => {
        const itemCount = $cartItems.length; 
        cy.log("elements in cart: " + itemCount); 
        
        cy.get('[data-test="shopping-cart-badge"]').invoke('text').then((text) => {
            const cartItemCount = parseInt(text, 10); 
            cy.log("elements in cart icon: " + cartItemCount); 
            if (itemCount === cartItemCount) {
                cy.log('cart icon equal to elements in cart');
            } else {
                cy.log('cart icon doesn`t work');
            }
        });
    });
    
    });
      });
    
 
