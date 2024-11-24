import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IncidenciaService, Incidencia } from '../incidencia.service';
import { AgentsAuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../client/client.service';
import { Client } from '../client/client-register/Client';
import { ClientPlanService } from '../client/client-plan/client-plan.service';
import { Plan } from '../client/client-plan/Plan';

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
  agent_id: string | null = '';
  plan_name: string | null = '';
  clients: Client[] = [];
  selectedClient: Client | null = null;
  planData: Plan | null = null;
  planDataName: string = '';


  constructor(
    private fb: FormBuilder,
    private incidenciaService: IncidenciaService,
    private authService: AgentsAuthService,
    private router: Router,
    private toastr: ToastrService,
    private clientService : ClientService,
    private plansService: ClientPlanService
  ) {
    this.incidenciaForm = this.fb.group({
      user_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      cliente: ['', Validators.required],
      canal: ['', Validators.required]
    });

    this.authService.login("test@example.com", "securepassword")
  }

  ngOnInit(): void {
    this.getTokenAndClientId();
    this.fetchClients();
   }

  guardar(): void {
    if (this.incidenciaForm.valid && this.selectedClient?.id && this.agent_id) {
      const formValues = this.incidenciaForm.value;
      //const agent_id = localStorage.getItem("agent_id") || '';
      console.log(formValues);
      const nuevaIncidencia: Incidencia = {
        agent_id: this.agent_id, 
        description: formValues.descripcion,
        date: new Date().toISOString().split('T')[0],
        registration_medium: formValues.canal,
        user_id: formValues.user_id, 
        client_id: this.selectedClient.id
      };
      this.incidenciaService.crearIncidencia(nuevaIncidencia).subscribe({
        next: (response) => {
          console.log('Incidencia guardada:', response);
          this.mensajeExito = $localize + "Incidencia creada exitosamente. id del incidente:" + response.id;
          
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
    this.clients = [];
    this.fetchClients();
    this.incidenciaForm.reset();
    this.mensajeExito = '';
    this.possibleSolution = "";
    this.mensajeError = '';
    console.log('Formulario cancelado');
  }
  
  limpiarForm(): void {
    this.clients = [];
    this.fetchClients();
    this.incidenciaForm.reset();
    this.possibleSolution = "";
    this.mensajeError = '';
    setTimeout(() => {
      this.mensajeExito = '';
  }, 7000); 
  }

  onDescripcionBlur(): void {
    const formValues = this.incidenciaForm.value;
    if (formValues.descripcion !== '') {
        this.incidenciaService.getIncidentPosibleSolution(formValues.descripcion).subscribe({
          next: (response) => {
            this.possibleSolution = response.possible_solution;
          }
        })
    }
  }


  getTokenAndClientId() {
    this.token = sessionStorage.getItem('token');
    this.client_id = sessionStorage.getItem('client_id');
    this.agent_id = localStorage.getItem('agent_id');
   
    if(this.token === null || this.agent_id === null) {
      this.toastr.error('No se ha iniciado sesión', 'Error');
      this.router.navigate(['agents/login']);
    }
  }

  fetchClients(): void {
    this.clientService.getClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.ordenarPorCompanyName();
      },
      error: (err) => {
        this.toastr.error('Error al cargar los clientes', 'Error');
      }
    });
  }

  onClientChange(event: Event): void {
    const selectElement = event.target as HTMLSelectElement; // Casting a HTMLSelectElement
    const clientId = selectElement.value; // Ahora puedes acceder a 'value'
    this.incidenciaForm.get('cliente')?.setValue(selectElement.value);
    this.selectedClient = this.clients.find(client => client.id === clientId) || null;
    //console.log('Cliente seleccionado:', this.selectedClient);

    if (this.selectedClient) {
      this.client_id = this.selectedClient.id;
      this.getPlanData(this.selectedClient.id);
    }
  }

  getPlanData(clientId: string): void {
      this.plansService.getClientPlan(clientId).subscribe({
        next: (response) => {
          if (typeof response === 'string') {
            this.toastr.error(response,'Error de carga');
          } else {
            // Si la respuesta es un objeto ClientPlan
            this.planData = response as Plan;
            console.log(">>>>>>>>"+this.planData.nombre)
            if(this.planData.nombre){
              if(this.planData.nombre === 'Emprendedor'){
                this.planDataName = 'Emprendedor';
              }else if(this.planData.nombre === 'Empresario'){
                this.planDataName = 'Empresario';
              }else if(this.planData.nombre === 'Empresario Plus'){
                this.planDataName = 'Empresario Plus';
              }
            }
          }
          
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
        }
      });
    }

    ordenarPorCompanyName(): void {
      this.clients.sort((a, b) => {
        if (a.company_name.toLowerCase() < b.company_name.toLowerCase()) {
          return -1; // a va antes que b
        }
        if (a.company_name.toLowerCase() > b.company_name.toLowerCase()) {
          return 1; // b va antes que a
        }
        return 0; // son iguales
      });
    }

  
    allowOnlyNumbers(event: KeyboardEvent): void {
      const charCode = event.charCode || event.keyCode;
      if (charCode < 48 || charCode > 57) {
        event.preventDefault();
      }
    }
  


}
