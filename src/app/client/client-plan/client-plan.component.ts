import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Plan } from './Plan';
import { ClientPlanService } from './client-plan.service';
import { ClientsAuthService } from '../../auth/auth.service';
import { ClientPlan } from './client-plan';


@Component({
  selector: 'app-client-plan',
  templateUrl: './client-plan.component.html',
  styleUrls: ['./client-plan.component.css']
})
export class ClientPlanComponent implements OnInit {

  client_id: string = '';
  token: string = '';
  clientPlan: ClientPlan | null = null;
  //client_id: string = "5b1429d9-ffad-40bc-a27f-37b0ff38e58a";
  //token: string = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiI1YjE0MjlkOS1mZmFkLTQwYmMtYTI3Zi0zN2IwZmYzOGU1OGEiLCJleHAiOjE3MzA0ODEzNDYsImlhdCI6MTczMDQ3Nzc0NiwianRpIjoiNTBlNjhmNDMtYTMyNi00MDJmLWE3ZTUtOTI5MDkyOWE4Y2Q1In0.-W_HcP6fz-1PyecTJ2TvovAUgjNJlQrm2Jls_Xrjyag" 
  selectedPlan: Plan | null = null;
  availablePlans: Plan[] = []; 

  constructor(private router: Router, private toastr: ToastrService, private plansService: ClientPlanService, private clientsAuthService:ClientsAuthService) { }

  ngOnInit() {
    this.getTokenAndClientId();
    if(this.token === null || this.client_id === null) {
      //TODO redirect to login page
      this.toastr.error('No se ha iniciado sesión', 'Error');
      this.router.navigate(['clients/login']);
    }else{
      this.getPlans(this.token);
    }
    
  }

  selectPlan(plan: Plan): void {
    this.selectedPlan = plan;
  }



  saveSelection(): void {

    if (this.selectedPlan) {

      this.plansService.assignPlanToClient( this.token, this.client_id, this.selectedPlan.id).subscribe({
        next: (response) => {
          console.log('Plan asignado:', response);
          this.toastr.success('¡Plan guardado!', 'Has seleccionado un plan correctamente');
          this.getClientData()
         
        },
        error: (error) => {
          console.error('Error al asignar el plan:', error);
          this.toastr.error('Error al asignar el plan', 'Error');
        }
      });

      
    } else {
      this.toastr.warning('Por favor selecciona un plan.');
    }
  }

  goBack(): void {
    console.log('Volver atrás');
  }

  getPlans(token: string | null) {
    if (token) {
      this.plansService.getPlans(token).subscribe({
        next: (plans) => {
          this.availablePlans = plans;
      
          if (this.availablePlans.length >= 3) {
            this.getFeatures();
          }
          this.toastr.info('Planes cargados correctamente', 'Información');
          
        },
        error: (error) => {
          console.error('Error al obtener los planes:', error);
          this.toastr.error('Error al obtener los planes', 'Error');
        }
      });
    } else {
      this.toastr.warning('Cliente no identificado', 'Advertencia');
    }
  }

  getFeatures(){

    let emprendedor: string[] = [];
    emprendedor.push("Registro de PQRs vía telefonica");
    this.availablePlans[0].features = emprendedor;

    let empresario: string[] = [];
    empresario.push("Registro de PQRs vía telefonica");
    empresario.push("Registro de PQRs vía Chatbot.");
    empresario.push("Registro de PQRs vía App Móvil.");
    this.availablePlans[1].features = empresario;


    let plus: string[] = [];
    plus.push("Registro de PQRs vía telefonica");
    plus.push("Registro de PQRs vía Chatbot.");
    plus.push("Registro de PQRs vía App Móvil.");
    plus.push("Registro de PQRs vía correo electrónico.");
    plus.push("Aprendizaje de máquina");
    plus.push("Inteligencia artificial");
    this.availablePlans[2].features = plus

    }
  
  
  getTokenAndClientId() {
    this.token = sessionStorage.getItem('token') || '';
    this.client_id = sessionStorage.getItem('client_id') || '';
   
  }


  getClientData(): void {
    if (this.token && this.client_id) {

      this.clientsAuthService.getClientData(this.token, this.client_id).subscribe({
        next: (response) => {
          if (typeof response === 'string') {
            this.toastr.error(response,'Error de carga');
          } else {
            // Si la respuesta es un objeto ClientPlan
            this.clientPlan = response as ClientPlan;
            
            sessionStorage.setItem('client_plan', JSON.stringify(response));
            this.router.navigate(['clients/dashboard']);
          }
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
        }
      });
    }
  }


}
