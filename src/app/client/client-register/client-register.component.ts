import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  clienteForm: FormGroup;

  constructor(private fb: FormBuilder, private toastr: ToastrService) {
    this.clienteForm = this.fb.group({
      usuario: ['', [Validators.required, Validators.maxLength(20)]],
      compania: ['', [Validators.required, Validators.maxLength(20)]],
      correo: ['', [Validators.required, Validators.email, Validators.maxLength(20)]],
      direccion: ['', [Validators.required, Validators.maxLength(50)]],
      contrasena: ['', [Validators.required,Validators.minLength(8), Validators.maxLength(50)]],
      confirmarContrasena: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }

  ngOnInit() {
  }

  passwordMatchValidator(form: FormGroup) {
    const password = form.get('contrasena')?.value;
    const confirmPassword = form.get('confirmarContrasena')?.value;

    if (password !== confirmPassword) {
      form.get('confirmarContrasena')?.setErrors({ mismatch: true });
    } else {
      form.get('confirmarContrasena')?.setErrors(null);
    }
  }

  guardarCliente() {
    if (this.clienteForm.invalid) {
      this.showValidationErrors();
      return;
    }

    
    console.log('Cliente guardado:', this.clienteForm.value);
    this.toastr.success('Cliente guardado exitosamente', 'Éxito');
  }

  showValidationErrors() {
    const controls = this.clienteForm.controls;
  
    if (controls['usuario'].hasError('required')) {
      this.toastr.error('El campo Usuario es obligatorio', 'Error de Validación');
    } else if (controls['usuario'].hasError('maxlength')) { // <--- Cambiado a "maxlength"
      this.toastr.error('El campo Usuario no puede superar los 50 caracteres', 'Error de Validación');
    }
  
    if (controls['compania'].hasError('required')) {
      this.toastr.error('El campo Compañía es obligatorio', 'Error de Validación');
    } else if (controls['compania'].hasError('maxlength')) { // <--- Cambiado a "maxlength"
      this.toastr.error('El campo Compañía no puede superar los 50 caracteres', 'Error de Validación');
    }
  
    if (controls['correo'].hasError('required')) {
      this.toastr.error('El campo Correo es obligatorio', 'Error de Validación');
    } else if (controls['correo'].hasError('email')) {
      this.toastr.error('Formato de correo inválido', 'Error de Validación');
    } else if (controls['correo'].hasError('maxlength')) { // <--- Cambiado a "maxlength"
      this.toastr.error('El campo Correo no puede superar los 50 caracteres', 'Error de Validación');
    }
  
    if (controls['direccion'].hasError('required')) {
      this.toastr.error('El campo Dirección es obligatorio', 'Error de Validación');
    } else if (controls['direccion'].hasError('maxlength')) { // <--- Cambiado a "maxlength"
      this.toastr.error('El campo Dirección no puede superar los 50 caracteres', 'Error de Validación');
    }
  
    if (controls['contrasena'].hasError('required')) {
      this.toastr.error('El campo Contraseña es obligatorio', 'Error de Validación');
    } else if (controls['contrasena'].hasError('minlength')) {
      this.toastr.error('La contraseña debe tener al menos 6 caracteres', 'Error de Validación');
    } else if (controls['contrasena'].hasError('maxlength')) { // <--- Cambiado a "maxlength"
      this.toastr.error('La contraseña no puede superar los 50 caracteres', 'Error de Validación');
    }
  
    if (controls['confirmarContrasena'].hasError('required')) {
      this.toastr.error('Debe confirmar la contraseña', 'Error de Validación');
    } else if (controls['confirmarContrasena'].hasError('mismatch')) {
      this.toastr.error('Las contraseñas no coinciden', 'Error de Validación');
    }
  }


}
