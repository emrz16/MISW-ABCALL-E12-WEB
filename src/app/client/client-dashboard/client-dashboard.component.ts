import { Component, OnInit } from '@angular/core';
import { ClientPlan } from '../client-plan/client-plan';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { ClientPlanService } from '../client-plan/client-plan.service';
import { Plan } from '../client-plan/Plan';

@Component({
  selector: 'app-client-dashboard',
  templateUrl: './client-dashboard.component.html',
  styleUrls: ['./client-dashboard.component.css']
})
export class ClientDashboardComponent implements OnInit {

  clientplan: ClientPlan | null = null;
  token: string | null = '';
  client_id: string | null = '';
  planData: Plan | null = null;

  constructor(    private toastr: ToastrService,
     private router: Router,
     private plansService: ClientPlanService
    ) { }

  ngOnInit() {
    
    this.getTokenAndClientId();
    const clientPlanData = sessionStorage.getItem('client_plan');
    
    if (clientPlanData) {
      this.clientplan = JSON.parse(clientPlanData);
      console.log('clientplan:', this.clientplan?.email);
      this.getPlanData();

    } else {
      this.clientplan = null;
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

  reportes() {
    this.router.navigate(['clients/board']);
  }

  crearIncidencia() {
    this.router.navigate(['incidents']);
  }

  modificarPlan() {
    this.router.navigate(['clients/plan-selection']);
  }

  getPlanData(): void {
    if (this.token && this.client_id) {

      this.plansService.getClientPlan(this.client_id).subscribe({
        next: (response) => {
          if (typeof response === 'string') {
            this.toastr.error(response,'Error de carga');
          } else {
            // Si la respuesta es un objeto ClientPlan
            this.planData = response as Plan;
            //sessionStorage.setItem('plan_data', JSON.stringify(this.plan));
          }
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
        }
      });
    }
  }





}
