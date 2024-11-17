import config from "../fixtures/config.json";
import LoginPageClient from "./pageObjects/loginClient";

describe('Módulo de Incidencias', () => {
  beforeEach(() => {
    // Setup común para todos los tests
    const loginPageClient = new LoginPageClient();
    cy.visit(config.baseUrl + '/clients/login');
    cy.wait(2000);
    loginPageClient.clearLoginForm();
    loginPageClient.login(config.clientEmail, config.clientPassword);
    cy.wait(1000);
    cy.visit(config.baseUrl + '/incidents');
    cy.wait(1000);
  });

  it('Debería crear una incidencia con datos válidos', () => {
    // Llenar el formulario
    cy.get('#user_id').type('12345');
    cy.get('#descripcion').type('Problema con el servicio de internet');
    cy.get('#canal').select('email');

    // Enviar el formulario
    cy.get('button[type="submit"]').click();

    // Verificar mensaje de éxito
    cy.get('.alert-success').should('be.visible');
    cy.get('.alert-success').should('contain', 'Incidencia creada exitosamente');

    // Verificar que se muestre la sugerencia de IA
    cy.get('h4').contains('Sugerencia IA').should('be.visible');
    cy.get('.col-2 p').should('not.be.empty');
    cy.get('.col-2 p').invoke('text').should('have.length.gt', 0);
  });

  it('Debería mostrar errores de validación cuando los campos están vacíos', () => {
    cy.get('button[type="submit"]').click();

    cy.get('.text-danger').should('be.visible');
    cy.contains('El usuario es requerido').should('be.visible');
    cy.contains('La descripción es requerida').should('be.visible');
    cy.contains('El canal es requerido').should('be.visible');
  });

  it('Debería limpiar el formulario al hacer click en cancelar', () => {
    cy.get('#user_id').type('12345');
    cy.get('#descripcion').type('Test descripción');
    cy.get('#canal').select('phone');

    cy.contains('button', 'Cancelar').click();

    cy.get('#user_id').should('have.value', '');
    cy.get('#descripcion').should('have.value', '');
    cy.get('#canal').should('have.value', null);
  });

  it('Debería mostrar sugerencia de IA después de crear incidencia', () => {
    cy.get('#user_id').type('12345');
    cy.get('#descripcion').type('Problema técnico');
    cy.get('#canal').select('phone');
    cy.get('button[type="submit"]').click();

    cy.get('h4').contains('Sugerencia IA').should('be.visible');
    cy.get('.col-2 p').should('exist');
  });

  it('Debería validar la longitud máxima de la descripción', () => {
    const longText = 'a'.repeat(1001);
    cy.get('#descripcion').type(longText);
    cy.get('button[type="submit"]').click();
  });




  
});
