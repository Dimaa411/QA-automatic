import cart from '../downloads/addingToCart';

const cartAdd = new cart();

describe('Sauce Demo Checkout Tests', () => {
  beforeEach(() => {
    cy.visit('https://www.saucedemo.com');
    
    cy.get("#user-name").type('standard_user');
    cy.get("#password").type('secret_sauce');
    cy.get("#login-button").click();

    const items = ['Sauce Labs Backpack', 'Sauce Labs Bike Light', 'Sauce Labs Bolt T-Shirt'];
    cartAdd.btnAdd(items);


    cy.get('[data-test="shopping-cart-link"]').click();
    cy.get('[data-test="checkout"]').click();
  });

  it('should calculate the correct total amount', () => {
    
    cy.get('[data-test="firstName"]').type("Josh");
    cy.get('[data-test="lastName"]').type('Palmer');
    cy.get('[data-test="postalCode"]').type("12324");
    cy.get('[data-test="continue"]').click();


//checking sum

let totalSum = 0;

cy.get('.cart_item').each(($item) => {
 
  cy.wrap($item)
    .find('[data-test="inventory-item-price"]')
    .invoke('text')
    .then((priceText) => {
      const price = parseFloat(priceText.replace('$', '').trim());
      totalSum += price; 
    });
}).then(() => {

  cy.get('[data-test="tax-label"]').invoke('text').then((taxText) => {
    const tax = parseFloat(taxText.replace('Tax: $', '').trim());
    totalSum += tax; 

    cy.get('[data-test="total-label"]').invoke('text').then((totalText) => {
      const displayedTotal = parseFloat(totalText.replace('Total: $', '').trim());
      expect(totalSum).to.equal(displayedTotal);
      cy.log(`Total sum calculated: ${totalSum}, Displayed total: ${displayedTotal}`);
        });
      });
     });
    });
  });
