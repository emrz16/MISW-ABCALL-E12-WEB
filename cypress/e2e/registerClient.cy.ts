import RegisterClientPage from "./pageObjects/registerClientPage";
import ClientPlanPage from "./pageObjects/clientPlanPage";
import LoginPageClient from "./pageObjects/loginClient";
import config from "../fixtures/config.json";

describe('Registrar nuevo cliente', () => {
    beforeEach(() => {
        cy.visit(config.baseUrl + '/clients/register');
        const register = new RegisterClientPage();
        register.clearAllFields();
        cy.clearCookies();
        cy.clearLocalStorage();
    });
    it('should register a new client successfully', () => {
        const randomClient = `Usuario${Math.floor(Math.random() * 1000)}@test.com`;
        const register = new RegisterClientPage();
        register.registerNewClient(
            'Usuario1',
            'Direccion1',
            'Compania1',
            randomClient,
            '123456789',
            '123456789'
        );

        cy.get('.toast-success').should('be.visible');
    });

    it('debería mostrar errores de validación', () => {
        const register = new RegisterClientPage();
        register.submit();
        cy.get('.error-message').should('be.visible');
    });

    it('debería validar que las contraseñas coinciden', () => {
        const register = new RegisterClientPage();
        register.fillContrasena('Password123!');
        register.fillConfirmarContrasena('DifferentPass123!');
        register.submit();
        cy.contains('Las contraseñas no coinciden').should('be.visible');
    });


    it('debería seleccionar un plan después del registro del cliente', () => {
        const randomClient = `Usuario${Math.floor(Math.random() * 1000)}@test.com`;
        const register = new RegisterClientPage();
        // crear un cliente
        register.registerNewClient(
            'Usuario1',
            'Direccion1',
            'Compania1',
            randomClient,
            '123456789',
            '123456789'
        );
        
        cy.get('.toast-success').should('be.visible');
        
        // login del cliente
        const loginPage = new LoginPageClient();
        loginPage.clearLoginForm();
        loginPage.login(randomClient, '123456789');
        
        // seleccionar un plan
        const clientPlanPage = new ClientPlanPage();

        clientPlanPage.selectPlan(1);
        clientPlanPage.clickRegisterButton();
        
        cy.url().should('include', '/dashboard');
    });
});
