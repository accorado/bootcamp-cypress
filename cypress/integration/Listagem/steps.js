/// <reference types="cypress"/>


Given(/^que o site não possui registros$/, () => {
    'GET', '**/api/1/databases/userdetails/collections/newtable?**'
    cy.server()
    cy.route({
          method: 'GET',
          url: '**/api/1/databases/userdetails/collections/newtable?**',
          status: 200,
          response: 'fx:webtable-get-vazio' 
               }).as('getNewtable');
});

When(/^acessar a listagem$/, () => {
    cy.visit('WebTable.html');
});

Then(/^devo visualizar a listagem vazia$/, () => {
    cy.get('div[role=row]').should('have.length', 1);
});

Given(/^que o site possui apenas um registro$/, () => {
    cy.server()
    cy.route ({
        method: 'GET',
        url:'**/api/1/databases/userdetails/collections/newtable?**',
        status: 200,
        response: 'fx:webtable-get-unico'  //fx = fixture referenciar a roto que tem os dados
})
});

Then(/^devo visualizar a listagem com apenas um registro$/, () => {
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
    cy.get('@gridCellPhone').should('contain.text', '3129876543')
})
