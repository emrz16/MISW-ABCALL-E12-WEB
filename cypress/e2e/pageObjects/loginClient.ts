class LoginPageClient {
    getEmailInput() {
        return cy.get('#email'); 
    }

    getPasswordInput() {
        return cy.get('#password'); 
    }

    getLoginButton() {
        return cy.get('button[type="submit"]'); 
    }

    enterEmail(email:string) {
        this.getEmailInput().type(email);
    }

    enterPassword(password:string) {
        this.getPasswordInput().type(password);
    }

    clickLoginButton() {
        this.getLoginButton().click();
    }

    login(email:string, password:string) {
        this.enterEmail(email);
        this.enterPassword(password);
        this.clickLoginButton();
    }
}

export default LoginPageClient;
