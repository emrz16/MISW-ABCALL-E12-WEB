export class ClientPlanPage {
    // Selectors
    private readonly logo = 'img[src="assets/images/panda.png"]';
    private readonly title = 'h2';
    private readonly planTitle = 'h3';
    private readonly planCards = '.plan-card';

    // Actions
    selectPlan(planIndex: number) {
        cy.get(this.planCards).should('exist').eq(planIndex).click();
        return this;
    }

    clickRegisterButton() {
        cy.contains('button', 'Registrarse').click({force:true});
        return this;
    }

    // Assertions
    verifyPageLoaded() {
        cy.get(this.logo).should('be.visible');
        cy.get(this.title).should('contain.text', 'ABCall');
        cy.get(this.planTitle).should('contain.text', 'Selecciona tu Plan');
        return this;
    }

    verifyPlanCount(expectedCount: number) {
        cy.get(this.planCards).should('have.length', expectedCount);
        return this;
    }

    verifyPlanDetails(planIndex: number, expectedName: string, expectedDescription: string) {
        cy.get(this.planCards).eq(planIndex).within(() => {
            cy.get('.card-title').should('contain.text', expectedName);
            cy.get('.card-text').should('contain.text', expectedDescription);
        });
        return this;
    }

    verifyRegisterButtonState(shouldBeEnabled: boolean) {
        cy.get(this.registerButton).should(shouldBeEnabled ? 'not.be.disabled' : 'be.disabled');
        return this;
    }
}

export default ClientPlanPage;