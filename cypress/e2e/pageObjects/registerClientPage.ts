class RegisterClientPage {
    private usuarioInput = '[formControlName="usuario"]';
    private direccionInput = '[formControlName="direccion"]';
    private companiaInput = '[formControlName="compania"]';
    private correoInput = '[formControlName="correo"]';
    private contrasenaInput = '[formControlName="contrasena"]';
    private confirmarContrasenaInput = '[formControlName="confirmarContrasena"]';
    private guardarButton = '.guardar-button';

    fillUsuario(usuario: string) {
        cy.get(this.usuarioInput).type(usuario);
    }

    fillDireccion(direccion: string) {
        cy.get(this.direccionInput).type(direccion);
    }

    fillCompania(compania: string) {
        cy.get(this.companiaInput).type(compania);
    }

    fillCorreo(correo: string) {
        cy.get(this.correoInput).type(correo);
    }

    fillContrasena(contrasena: string) {
        cy.get(this.contrasenaInput).type(contrasena);
    }

    fillConfirmarContrasena(confirmarContrasena: string) {
        cy.get(this.confirmarContrasenaInput).type(confirmarContrasena);
    }

    clearAllFields() {
        cy.get(this.usuarioInput).clear();
        cy.get(this.direccionInput).clear();
        cy.get(this.companiaInput).clear();
        cy.get(this.correoInput).clear();
        cy.get(this.contrasenaInput).clear();
        cy.get(this.confirmarContrasenaInput).clear();
    }
    

    submit() {
        cy.get(this.guardarButton).click();
    }

    registerNewClient(
        usuario: string,
        direccion: string,
        compania: string,
        correo: string,
        contrasena: string,
        confirmarContrasena: string
    ) {
        this.fillUsuario(usuario);
        this.fillDireccion(direccion);
        this.fillCompania(compania);
        this.fillCorreo(correo);
        this.fillContrasena(contrasena);
        this.fillConfirmarContrasena(confirmarContrasena);
        this.submit();
    }
}

export default RegisterClientPage;