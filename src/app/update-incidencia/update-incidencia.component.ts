import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Incidencia, IncidenciaService, IncidenciaUpdate, IncidentDetail } from '../incidencia.service';
import { AgentsAuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientService } from '../client/client.service';
import { ClientPlanService } from '../client/client-plan/client-plan.service';
import { Client } from '../client/client-register/Client';
import { Plan } from '../client/client-plan/Plan';
import { any } from 'cypress/types/bluebird';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-update-incidencia',
  templateUrl: './update-incidencia.component.html',
  styleUrls: ['./update-incidencia.component.css']
})
export class UpdateIncidenciaComponent implements OnInit {

  incidentToUpdate: any = {};
  incidenciaForm: FormGroup;
  mensajeExito: string = '';
  mensajeError: string = '';
  possibleSolution: string = '';
  token: string | null = '';
  client_id: string | null = '';
  agent_id: string | null = '';
  plan_name: string | null = '';
  planDataName: string = '';
  incident_detail: IncidentDetail = {} as IncidentDetail;
  clients: Client[] = [];
  selectedClient: Client | null = null;
  planData: Plan | null = null;



  constructor(
    private fb: FormBuilder,
    private incidenciaService: IncidenciaService,
    private authService: AgentsAuthService,
    private router: Router,
    private toastr: ToastrService,
    private clientService : ClientService,
    private plansService: ClientPlanService
  ) {
    this.incidentToUpdate = localStorage.getItem('incident_to_update') || '';
    this.getTokenAndClientId();
    

    this.incidenciaForm = this.fb.group({
      user_id: ['', Validators.required],
      descripcion: ['', Validators.required],
      solucion: ['', Validators.required],
      cliente: ['', Validators.required],
      canal: ['', Validators.required]
    });
   }

   ngOnInit(): void {
    this.clientService.getClients().pipe(
      switchMap((clients) => {
        this.clients = clients;
        this.ordenarPorCompanyName();
        return this.incidenciaService.getIncidentDetail(this.incidentToUpdate);
      })
    ).subscribe({
      next: (data) => {
        this.incident_detail = data;
        this.incidenciaForm.get('user_id')?.setValue(this.incident_detail?.user_id);
        this.incidenciaForm.get('descripcion')?.setValue(this.incident_detail?.description);
        const theClient:Client = this.findClientById(this.incident_detail?.client_id);
        if (theClient) {
          console.log('Cliente seleccionado:', theClient.id + ' ' + theClient.company_name);
          this.incidenciaForm.get('cliente')?.setValue(theClient.id);
          this.selectedClient = theClient;
          this.getPlanData(theClient.id);


        }
        let canal = "";
        if(this.incident_detail?.registration_medium == 'EMAIL'){
          canal = 'email';
        } else if(this.incident_detail?.registration_medium == 'PHONE'){
          canal = 'phone';
        }else if(this.incident_detail?.registration_medium == 'CHAT'){
          canal =  'CHAT';
        }
        this.incidenciaForm.get('canal')?.setValue(canal);
        
      },
      error: (err) => {
        this.toastr.error('No se ha podido completar la carga de datos', 'Error');
      }
    });
  }



  getTokenAndClientId() {
    this.token = localStorage.getItem('token');
    this.agent_id = localStorage.getItem('agent_id');
   
    if(this.token === null || this.agent_id === null) {
      this.toastr.error('No se ha iniciado sesión', 'Error');
      this.router.navigate(['agents/login']);
    }

    
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

    actualizar(): void {
      if ( this.selectedClient?.id && this.agent_id) {
        const formValues = this.incidenciaForm.value;
        const solucion = this.incidenciaForm.get('solucion')?.value;


        const nuevaIncidencia: IncidenciaUpdate = {
          agent_id: this.agent_id, 
          description: formValues.descripcion + ' Solucion: ' + solucion,
          date: new Date().toISOString().split('T')[0],
          registration_medium: formValues.canal,
          user_id: formValues.user_id, 
          status: "OPEN"
        };
        this.incidenciaService.actualizarIncidencia(nuevaIncidencia,this.incident_detail.id).subscribe({
          next: (response) => {
            console.log('Incidencia Actualizada:', response);
            this.mensajeExito = 'Incidencia Actualizada.' + response.id;
  
          },
          error: (error) => {
            console.error('Error al Actualizar la incidencia:', error);
            this.mensajeError = error;
          }
        });
      } else {
        console.log("error al actualizar");
      }
    }

    cerrar(): void {
      if ( this.selectedClient?.id && this.agent_id) {
        const formValues = this.incidenciaForm.value;
        
        const solucion = this.incidenciaForm.get('solucion')?.value;
        console.log(formValues);
        const nuevaIncidencia: IncidenciaUpdate = {
          agent_id: this.agent_id, 
          description: formValues.descripcion + ' Solucion: ' + solucion,
          date: new Date().toISOString().split('T')[0],
          registration_medium: formValues.canal,
          user_id: formValues.user_id, 
          status: "CLOSED"
        };
        this.incidenciaService.actualizarIncidencia(nuevaIncidencia,this.incident_detail.id).subscribe({
          next: (response) => {
            console.log('Incidencia Cerrada:', response);
            this.mensajeExito = 'Incidencia Cerrada.' + response.id;
  
          },
          error: (error) => {
            console.error('Error al Cerrar la incidencia:', error);
            this.mensajeError = error;
          }
        });
      } else {
        console.log("error al actualizar");
      }
    }


    findClientById(clientId: string | undefined): any | undefined {
      if (!clientId) {
        console.error('Client ID es nulo o indefinido');
        return undefined;
      }
      //console.log(' clientes:', this.clients);
      return this.clients.find((client) => client.id === clientId);
    }

  

}
