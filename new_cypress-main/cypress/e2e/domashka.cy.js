import * as data from "../helpers/default_data.json"

describe('Автотесты для формы логина и пароля', function () {

    beforeEach('Начало теста', function () {
        cy.visit('https://login.qa.studio/');
    });
    
    afterEach('Конец теста', function () {
        cy.get('#exitMessageButton > .exitIcon').should('be.visible');
       });
    
    it('Верные логин и пароль', function () {
         cy.get('#mail').type(data.login);
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
     })
     it('Восстановление пароля', function () {
        cy.get('#forgotEmailButton').click();
        cy.get('#mailForgot').type(data.login);
        cy.get('#restoreEmailButton').click();
        cy.get('#messageHeader').contains('Успешно отправили пароль на e-mail');
    })
    it('Верный логин и неверный пароль', function () {
         cy.get('#mail').type(data.login);
         cy.get('#pass').type('iLoveqastudio');
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })
    it('Неверный логин и верный пароль', function () {
         cy.get('#mail').type('german@nedolnikov.ru');
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Такого логина или пароля нет');
    })
    it('Проверка валидации', function () {
         cy.get('#mail').type('germandolnikov.ru');
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Нужно исправить проблему валидации');
    })
    it('Приведение к строчным буквам логин', function () {
         cy.get('#mail').type('GerMan@Dolnikov.ru');
         cy.get('#pass').type(data.password);
         cy.get('#loginButton').click();
         cy.get('#messageHeader').contains('Авторизация прошла успешно');
    })
 }) 