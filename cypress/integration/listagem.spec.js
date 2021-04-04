/// <reference types="cypress"/>

context('Listagem', () => {
    it('Listagem sem registros', () => {
      'GET', '**/api/1/databases/userdetails/collections/newtable?**'
      cy.server()
      cy.route({
            method: 'GET',
            url: '**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-vazio' 
                 }).as('getNewtable');

        cy.visit('WebTable.html');

        cy.get('div[role=row]').should('have.length', 1);
    });


    it('Listagem com apenas um registro', () => {
        cy.server()
        cy.route ({
            method: 'GET',
            url:'**/api/1/databases/userdetails/collections/newtable?**',
            status: 200,
            response: 'fx:webtable-get-unico'  //fx = fixture referenciar a roto que tem os dados
        })

        cy.visit('WebTable.html');
       //como tem uma div dentro de uma div, usamos o find
    cy.get('div[role=row] div[role=gridcell]').eq(4).find('div').as('gridCellPhone')
    cy.get('@gridCellPhone').should('contain.text', '3129876543')
});
});



//elementos

//div]role=rowe]div[role=gridcell]