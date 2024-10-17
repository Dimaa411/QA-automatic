describe('Checkout: Overview Page Tests', () => {
  beforeEach(() => {
      cy.visit('https://www.saucedemo.com');

      cy.get("#user-name").type('standard_user');
      cy.get("#password").type('secret_sauce');
      cy.get("#login-button").click();

      const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
      items.forEach(item => {
          cy.contains(item).parents('.inventory_item').find('.btn_primary').click();
      });

      cy.get('[data-test="shopping-cart-link"]').click();
      cy.get('[data-test="checkout"]').click();

      cy.get('[data-test="firstName"]').type("Josh");
      cy.get('[data-test="lastName"]').type("Palmer");
      cy.get('[data-test="postalCode"]').type("12324");
      cy.get('[data-test="continue"]').click();
  });

  it('should verify total price with tax on Checkout: Overview page', () => {
  
      let totalSum = 0;
      cy.get('.cart_item').each(($item) => {
          cy.wrap($item).find('[data-test="inventory-item-price"]').invoke('text').then((text) => {
              const price = parseFloat(text.replace('$', '').trim());
              totalSum += price; 
          });
      }).then(() => {
         
          cy.get('[data-test="tax-label"]').invoke('text').then((taxText) => {
              const tax = parseFloat(taxText.replace('Tax: $', '').trim());
              const displayedTotal = totalSum + tax;

      
              cy.get('[data-test="total-label"]').invoke('text').then((totalText) => {
                  const displayedTotalPrice = parseFloat(totalText.replace('Total: $', '').trim());

                  
                  expect(displayedTotal).to.equal(displayedTotalPrice);
                  cy.log(`Calculated Total: $${displayedTotal}, Displayed Total: $${displayedTotalPrice}`);
              });
          });
      });
  });
});
