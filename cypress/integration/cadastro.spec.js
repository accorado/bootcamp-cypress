/// <reference types="cypress"/>

let Chance = require('chance');
let chance = new Chance();

context('Cadastro', () => {
    it('cadastro de usuário no site', () => {

      //rotas 

//POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
//POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
//GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X

cy.server()

cy.route('POST','**//api/1/databases/userdetails/collections/newtable?**' ).as('postNewtable'); // caracter é pra não especificar o caminho, tipo 200 da rota.

cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUsertable');

cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewtable'); //apelidos para as rotas depois do .as


//rotas do cadastro porque a aplicação é instável, foi disponibilizado no github do professor samuel
  cy.route({
          method: 'POST',
          url: '**/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X',
          status: 200,
          response: {}
        }).as('postNewtable');
        
        cy.route({
            method: 'POST', 
            url: '**/api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X', 
            status: 200, 
            response: {}
          }).as('postUsertable');
        
        cy.route({
          method: 'GET',
          url: '**/api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X',
          status: 200,
          response: {}
          }).as('getNewtable');

        
        //Base Url + Register.htm
        cy.visit('Register.html');

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
        
        //click para submeter o cadastro
        cy.get('button#submitbtn').click();

          //chamar as rotas criadas lá em cima, só depois do click e o cy.wait espera a rota ter uma resposta.
        cy.wait('@postNewtable').then((resNewtable) => {
            //blibioteca chai daqui pra baixo ou expect
            expect(resNewtable.status).to.eq(200)
        })

        cy.wait('@postUsertable').then((resUsertable) => {
            expect(resUsertable.status).to.eq(200)
        })

        cy.wait('@getNewtable').then((resNewtable)=> {
            expect(resNewtable.status).to.eq(200)

            //redirecionamento da próxima pagina.
        cy.url().should('contain', 'WebTable');

        })

    });
});



// elementos
// input[placeholder="First Name"]
//input [ng-model^=Last]
//input[ng-model^=Email]
//input[ng-model^=Phone]
//input[value=FeMale]
//input[type='checkbox']
//select#Skills
//select#countries
//select#country
//select#yearbox
//select[ng-model^=month]
//select#daybox
//input#firstpassword
//input#secondpassword
//button#imagesrc
