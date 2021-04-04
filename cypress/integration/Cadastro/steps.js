// implementação dos passos descritos nas features

/// <reference types="cypress" />

let Chance = require('chance');
let chance = new Chance();


When(/^informar meus dados$/, () => {
	   //por ser elemento de texto, usa type
       cy.get('input[placeholder= "First Name"]').type(chance.first())
       cy.get('input[ng-model^=Last]').type(chance.last())
       cy.get('input[ng-model^=Email]').type(chance.email())
       cy.get('input[ng-model^=Phone]').type(chance.phone({ formatted: false}))

       // check, radio ou checkboxes
       cy.get('input[value=FeMale]').check();
       cy.get('input[type=checkbox]').check('Cricket');
       cy.get('input[type=checkbox]').check('Hockey');
          
       // select, select2 (combos)
       cy.get('select#Skills').select('Javascript');
       cy.get('select#countries').select('Argentina');
       cy.get('select#country').select('Australia', { force: true}); 
       cy.get('select#yearbox').select('1980');
       cy.get('select[ng-model^=month]').select('February');
       cy.get('select#daybox').select('14');
       cy.get('input#firstpassword').type('Bootcamp@2021');
       cy.get('input#secondpassword').type('Bootcamp@2021');

       // upload da foto, attachFile - input file
       cy.get('input#imagesrc').attachFile('imagem-foto.jpg');
});

When(/^salvar$/, () => {
	//click para submeter o cadastro
    cy.get('button#submitbtn').click();
});

Then(/^devo ser cadastrado com sucesso$/, () => {
    cy.wait('@postNewtable').then((resNewtable) => {
        //blibioteca chai daqui pra baixo ou expect
        expect(resNewtable.status).to.eq(200)
    })

    cy.wait('@postUsertable').then((resUsertable) => {
        expect(resUsertable.status).to.eq(200)
    })

    cy.wait('@getNewtable').then((resNewtable)=> {
        expect(resNewtable.status).to.eq(200)
    })
        //redirecionamento da próxima pagina.
    cy.url().should('contain', 'WebTable');
});
