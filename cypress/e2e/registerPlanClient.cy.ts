import { ClientPlanPage } from './pageObjects/clientPlanPage';
import config from "../fixtures/config.json";
import LoginPageClient from './pageObjects/loginClient';

describe('Client Plan Selection', () => {
    const clientPlanPage = new ClientPlanPage();

    beforeEach(() => {
        cy.visit(config.baseUrl + '/clients/login');   
        const loginPage = new LoginPageClient();
        loginPage.clearLoginForm();
        loginPage.login(config.clientEmail, config.clientPassword);
        cy.wait(1000);
        cy.visit(config.baseUrl + '/clients/plan-selection');
    });

    it('should load the client plan page correctly', () => {
        clientPlanPage.verifyPageLoaded();
    });

    it('should display three plan options', () => {
        clientPlanPage.verifyPlanCount(3);
    });

    it('should verify plan details', () => {
        clientPlanPage
            .verifyPlanDetails(0, 'Emprendedor')
            .verifyPlanDetails(1, 'Empresario')
            .verifyPlanDetails(2, 'Empresario Plus');
    });

    it('should handle plan selection', () => {
        // Initially register button should be disabled
        clientPlanPage.verifyRegisterButtonState(false);

        // Select a plan
        clientPlanPage.selectPlan(1);

        // Register button should be enabled after selection
        clientPlanPage.verifyRegisterButtonState(true);
    });

    it('should navigate to registration when clicking register button', () => {
        clientPlanPage
            .selectPlan(0)
            .clickRegisterButton();
        
        // Verify navigation (assuming it redirects to registration page)
        cy.url().should('include', '/dashboard');
    });
});