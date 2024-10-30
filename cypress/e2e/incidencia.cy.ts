import config from "../fixtures/config.json";
import LoginPageClient from "./pageObjects/loginClient";

describe('Crear una incidencia', () => {
  it('Creacion de una incidencia correctamente', () => {
    const loginPageClient = new LoginPageClient(); 
    cy.visit(config.baseUrl + '/clients/login')
    loginPageClient.login(config.clientEmail, config.clientPassword);
    cy.visit(config.baseUrl + '/clients/board')
    
  })

  it('Creacion de una incidencia', () => {
    const loginPageClient = new LoginPageClient(); 
    cy.visit(config.baseUrl + '/clients/login')
    loginPageClient.login(config.clientEmail, config.clientPassword);
    cy.clear()
  })
})