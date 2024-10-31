import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MaxLengthValidator, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ClientRegisterService } from './client-register.service';
import { Client } from './Client';
import { Router } from '@angular/router';
import { ClientDto } from './ClientDto';


@Component({
  selector: 'app-client-register',
  templateUrl: './client-register.component.html',
  styleUrls: ['./client-register.component.css']
})
export class ClientRegisterComponent implements OnInit {

  clienteForm: FormGroup;
  token: string = "";
  @Input() client!: Client;

  constructor(private fb: FormBuilder, private toastr: ToastrService, private clientRegisterService: ClientRegisterService,private router: Router ) {
    this.clienteForm = this.fb.group({  
      usuario: ['Usuario1', [Validators.required, Validators.maxLength(20)]],
      compania: ['Compania1', [Validators.required, Validators.maxLength(20)]],
      correo: ['client@test.com', [Validators.required, Validators.email, Validators.maxLength(20)]],
      direccion: ['Direccion1', [Validators.required, Validators.maxLength(50)]],
      contrasena: ['123456789', [Validators.required,Validators.minLength(8), Validators.maxLength(50)]],
      confirmarContrasena: ['123456789', Validators.required]
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

    this.clienteForm.value
    const clientDto:ClientDto = {
      email: this.clienteForm.value.correo,
      password: this.clienteForm.value.contrasena,
      name: this.clienteForm.value.usuario,
      company_name: this.clienteForm.value.compania,
    }

    this.clientRegisterService.registerClient(clientDto).subscribe({
      next: (response) => {
        console.log('Cliente registrado con éxito:', response);
        console.log('Cliente guardado:', this.clienteForm.value);
        this.toastr.success('Cliente guardado exitosamente', 'Éxito');
        this.router.navigate(['/clients/login']);
      },
      error: (error) => {
        console.error('Error al registrar cliente:', error);
        if (error.error) {
          this.toastr.error(error.error, 'Error de Validación');
        } else {
          this.toastr.error(error, 'Error de registro');
        }
      }
    });
  }

  showValidationErrors() {
    if (this.clienteForm.invalid) {
      this.toastr.error('Hay errores en el formulario. Por favor, revise los campos e intente de nuevo.', 'Error de Validación');
    }
  }


}
