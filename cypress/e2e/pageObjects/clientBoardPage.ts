class ClientBoardPage {
    // Selectors
    private stats = {
        resolvedIncidents: ':nth-child(1) > .card > .card-body > .card-text',
        openIncidents: ':nth-child(2) > .card > .card-body > .card-text',
        totalIncidents: ':nth-child(3) > .card > .card-body > .card-text',
        complianceRate: ':nth-child(4) > .card > .card-body > .card-text',
        averageResolutionTime: ':nth-child(5) > .card > .card-body > .card-text',
        averageResponseTime: ':nth-child(6) > .card > .card-body > .card-text',
        phoneIncidents: ':nth-child(7) > .card > .card-body > .card-text',
        emailIncidents: ':nth-child(8) > .card > .card-body > .card-text',
        chatIncidents: ':nth-child(9) > .card > .card-body > .card-text'
    };

    private buttons = {
        downloadReport: '.botones > .btn-dark.me-2',
        generateAnalysis: '.botones > .btn-dark:not(.me-2)',
        activate: '.btn-light.btn-lg'
    };

    private chat = {
        input: '.form-control',
        sendButton: 'img[src*="send.svg"]',
        attachmentButton: 'img[src*="attachment.svg"]',
        messages: '.chat-message',
        iaMessages: '.ia-message',
        userMessages: '.user-message'
    };

    // Navigation
    visit() {
        cy.visit('/board');
    }

    // Actions
    clickDownloadReport() {
        cy.get(this.buttons.downloadReport).click();
    }

    clickGenerateAnalysis() {
        cy.get(this.buttons.generateAnalysis).click();
    }

    clickActivate() {
        cy.get(this.buttons.activate).click();
    }

    sendChatMessage(message: string) {
        cy.get(this.chat.input).type(message);
        cy.get(this.chat.sendButton).click();
    }

    clickAttachment() {
        cy.get(this.chat.attachmentButton).click();
    }

    // Verifications
    verifyStatsAreVisible() {
        Object.values(this.stats).forEach(selector => {
            cy.get(selector).should('be.visible');
        });
    }

    verifyStatValue(statName: keyof typeof this.stats, expectedValue: string) {
        cy.get(this.stats[statName]).should('contain', expectedValue);
    }

    verifyChatIsVisible() {
        cy.get(this.chat.input).should('be.visible');
        cy.get(this.chat.sendButton).should('be.visible');
    }

    verifyChatMessage(message: string) {
        cy.get(this.chat.messages).should('contain', message);
    }

    verifyIAMessage(message: string) {
        cy.get(this.chat.iaMessages).should('contain', message);
    }

    verifyUserMessage(message: string) {
        cy.get(this.chat.userMessages).should('contain', message);
    }

    verifyBoardLoaded() {
        cy.get('.stats').should('be.visible');
    }
}

export default new ClientBoardPage();