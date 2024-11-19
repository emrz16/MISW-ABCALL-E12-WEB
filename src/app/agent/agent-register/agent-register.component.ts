import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AgenteService } from './agente.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agent-register',
  templateUrl: './agent-register.component.html',
  styleUrls: ['./agent-register.component.css']
})
export class AgentRegisterComponent implements OnInit {

  agenteForm: FormGroup;

  constructor(private fb: FormBuilder,private toastr: ToastrService,  private agenteService: AgenteService,private router: Router) { 
    this.agenteForm = this.fb.group({
      name: ['Agente1', [Validators.required]],
      email: ['agente@test.com', [Validators.required, Validators.email]],
      password: ['securepassword', [Validators.required]],
      identification: ['ID111223', [Validators.required]],
      phone: ['+0987654321', [Validators.required]],
      address: ['456 Elm St', [Validators.required]],
      city: ['Los Angeles'],
      role: ['agent'],
      state: ['CA'],
      zip_code: ['90001'],
      country: ['USA'],
    });
  }

  ngOnInit() {
  }

  guardarAgente(): void {
    if (this.agenteForm.invalid) {
      this.showValidationErrors();
      return;
    }


    
    this.agenteService.crearAgente(this.agenteForm.value).subscribe({
      next: (response) => {
        console.log('Agente registrado con éxito:', response);
        console.log('Agente guardado:', this.agenteForm.value);
        this.toastr.success('Agente guardado exitosamente', 'Éxito');
        this.router.navigate(['/agents/login']);
      },
      error: (error) => {
        console.error('Error al registrar cliente:', error);
        if (error.error) {
          this.toastr.error(error.error, 'Error de Validación');
        } else {
          this.toastr.error(error, 'Error de registro');
        }
      },
    });
    
  }


  showValidationErrors() {
    if (this.agenteForm.invalid) {
      this.toastr.error('Hay errores en el formulario. Por favor, revise los campos e intente de nuevo.', 'Error de Validación');
    }
  }

}
