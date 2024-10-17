export default class Cart {
    btnAdd(items) { 
      items.forEach((itemName) => {
        cy.contains(itemName) 
          .parents('.inventory_item')  
          .find('button') 
          .click();  
      });
    }
  }
  
  const user = {
    firstName: "Josh",
    lastName: "White",
    postalCode: "122334"
};
