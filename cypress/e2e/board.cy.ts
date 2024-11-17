import config from "../fixtures/config.json";
import LoginPageClient from "./pageObjects/loginClient";

// board.cy.ts
describe('Board Module', () => {
  beforeEach(() => {
    const loginPageClient = new LoginPageClient();

    cy.intercept('GET', '**/reports/*').as('getBoard');
    cy.visit(config.baseUrl + '/clients/login');
    loginPageClient.clearLoginForm();
    loginPageClient.login(config.clientEmail, config.clientPassword);
    cy.wait(1000);
    cy.visit(config.baseUrl + '/clients/board');
  });

  it('should load board metrics correctly', () => {
    cy.get('.stats .card').should('have.length', 9);
    cy.contains('Incidentes resueltos').should('be.visible');
    cy.contains('Incidentes abiertos').should('be.visible');
    cy.contains('Total incidentes').should('be.visible');
  });

  it('should activate and use chat functionality', () => {
    cy.contains('button', 'Activar').click();
    cy.get('.chat-window').should('be.visible');
    cy.wait(2000);
    const testMessage = 'Test message';
    cy.get('input[placeholder="Escribe tu mensaje"]').type(testMessage, {force: true});
    cy.get('img[src*="send.svg"]').parent('button').click({force: true});

    cy.get('.chat-message').should('contain', testMessage);
    
    cy.get('.ia-message', { timeout: 10000 }).should('be.visible');
  });
  
  it('should generate predictive analysis', () => {
    cy.contains('button', 'Activar').click({force: true});
    
    cy.contains('button', 'Generar análisis inteligente').click({force: true});
    
    cy.get('.ia-message', { timeout: 15000 })
      .should('have.length.gt', 2);
  });

  it('should auto-refresh board data', () => {
    cy.intercept('GET', '**/reports/*').as('refreshBoard');
    cy.wait(5500);
    cy.wait('@refreshBoard');
  });
});
