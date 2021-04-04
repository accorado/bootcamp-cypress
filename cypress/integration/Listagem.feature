#language: pt

Funcionalidade: Listagem

Como usuário, desejo acessar a listagem para que possa visualiar meus dados de cadastro

Cenario: Listagem sem registros
    Dado que o site não possui registros
    Quando acessar a listagem
    Então devo visualizar a listagem vazia

Cenario: Listagem com apenas um registro
    Dado que o site possui apenas um registro  
    Quando acessar a listagem
    Então devo visualizar a listagem com apenas um registro


