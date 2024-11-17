import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciaService, Incidencia } from '../incidencia.service';
import { AgentsAuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-crear-incidencia',
  templateUrl: './crear-incidencia.component.html',
  styleUrls: ['./crear-incidencia.component.css']
})
export class CrearIncidenciaComponent implements OnInit {
  incidenciaForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  possibleSolution: string = '';

  token: string | null = '';
  client_id: string | null = '';

  constructor(
    private fb: FormBuilder,
    private incidenciaService: IncidenciaService,
    private authService: AgentsAuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.incidenciaForm = this.fb.group({
      user_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      canal: ['', Validators.required]
    });
    this.authService.login("test@example.com", "securepassword")
  }

  ngOnInit(): void {
    this.getTokenAndClientId();
   }

  guardar(): void {

    if (this.incidenciaForm.valid && this.client_id) {
      const formValues = this.incidenciaForm.value;
      const agent_id = localStorage.getItem("agent_id") || '';
      console.log(formValues);
      const nuevaIncidencia: Incidencia = {
        agent_id: agent_id, 
        description: formValues.descripcion,
        date: new Date().toISOString().split('T')[0],
        registration_medium: formValues.canal,
        user_id: formValues.user_id, 
        client_id: this.client_id
      };
      this.incidenciaService.crearIncidencia(nuevaIncidencia).subscribe({
        next: (response) => {
          console.log('Incidencia guardada:', response);
          this.mensajeExito = 'Incidencia creada exitosamente. id del incidente: ' + response.id;
          
          this.incidenciaService.getIncidentSuggestion(response["id"]).subscribe({
            next: (response) => {
              this.possibleSolution = response.possible_solution;
            }
          })
          this.limpiarForm();

          // this.router.navigate(['/ruta-destino']);
        },
        error: (error) => {
          console.error('Error al guardar la incidencia:', error);
          this.mensajeError = error;
        }
      });
      //this.limpiarForm();
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
  
  limpiarForm(): void {
    this.incidenciaForm.reset();
    
    this.mensajeError = '';
    setTimeout(() => {
      this.mensajeExito = '';
  }, 7000); 
  }

  onDescripcionBlur(): void {
    const formValues = this.incidenciaForm.value;
    if (formValues.descripcion !== '') {
        this.incidenciaService.getIncidentPosibleSolution().subscribe({
          next: (response) => {
            this.possibleSolution = response.possible_solution;
          }
        })
    }
  }


  getTokenAndClientId() {
    this.token = sessionStorage.getItem('token');
    this.client_id = sessionStorage.getItem('client_id');
    if(this.token === null || this.client_id === null) {
      this.toastr.error('No se ha iniciado sesión', 'Error');
      this.router.navigate(['clients/login']);
    }
  }


}
