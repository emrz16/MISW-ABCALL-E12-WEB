import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciaService, Incidencia } from '../incidencia.service';
import { AgentsAuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-incidencia',
  templateUrl: './crear-incidencia.component.html',
  styleUrls: ['./crear-incidencia.component.css']
})
export class CrearIncidenciaComponent implements OnInit {
  incidenciaForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(
    private fb: FormBuilder,
    private incidenciaService: IncidenciaService,
    private authService: AgentsAuthService,
    private router: Router
  ) {
    this.incidenciaForm = this.fb.group({
      user_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      canal: ['', Validators.required]
    });
    this.authService.login("test@example.com", "securepassword")
  }

  ngOnInit(): void { }

  guardar(): void {
    if (this.incidenciaForm.valid) {
      const formValues = this.incidenciaForm.value;
      const agent_id = localStorage.getItem("agent_id") || '';
      console.log(formValues);
      const nuevaIncidencia: Incidencia = {
        agent_id: agent_id, 
        description: formValues.descripcion,
        date: new Date().toISOString().split('T')[0],
        registration_medium: formValues.canal,
        user_id: formValues.user_id, 
        client_id: ""
      };
      this.incidenciaService.crearIncidencia(nuevaIncidencia).subscribe({
        next: (response) => {
          console.log('Incidencia guardada:', response);
          this.mensajeExito = 'Incidencia creada exitosamente.';
          this.incidenciaForm.reset();
          // this.router.navigate(['/ruta-destino']);
        },
        error: (error) => {
          console.error('Error al guardar la incidencia:', error);
          this.mensajeError = error;
        }
      });
    } else {
      this.incidenciaForm.markAllAsTouched();
    }
  }

  cancelar(): void {
    this.incidenciaForm.reset();
    this.mensajeExito = '';
    this.mensajeError = '';
    console.log('Formulario cancelado');
  }
}
