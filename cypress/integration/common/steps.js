//steps/ passos comuns a mais de uma feature

Given(/^que acesso o site$/, () => {

    //POST 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    //POST 200 /api/1/databases/userdetails/collections/usertable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X
    //GET 200 /api/1/databases/userdetails/collections/newtable?apiKey=YEX0M2QMPd7JWJw_ipMB3a5gDddt4B_X

    cy.server()
    cy.route('POST','**//api/1/databases/userdetails/collections/newtable?**' ).as('postNewtable'); 

    cy.route('POST', '**/api/1/databases/userdetails/collections/usertable?**' ).as('postUsertable');

    cy.route('GET', '**/api/1/databases/userdetails/collections/newtable?**' ).as('getNewtable');

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


    cy.visit('Register.html');

});