import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsAuthService } from '../../auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ClientPlanService } from '../../../client/client-plan/client-plan.service';
import { ClientPlan } from '../../../client/client-plan/client-plan';
import { Plan } from '../../../client/client-plan/Plan';


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string | null = null;
  clientPlan: ClientPlan | null = null; 
  plan: Plan | null = null;

  constructor(private fb: FormBuilder,
     private clientsAuthService: ClientsAuthService,
     private router: Router,
    private toastr: ToastrService,
    private plansService: ClientPlanService
  ) {
    this.loginForm = this.fb.group({
      email: ['client@test.com', [Validators.required, Validators.email]],  
      password: ['123456789', [Validators.required, Validators.minLength(8)]] 
    });
  }

  ngOnInit() {
    
  }

  login() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.clientsAuthService.login(email, password).subscribe({
        next: (response) => {
          console.log('response token:', response.token);
          console.log('response client_id:', response.client_id);
          sessionStorage.setItem('token', response.token);
          sessionStorage.setItem('client_id', response.client_id);
          this.error = null;
          this.getClientData();
          //this.getClientPlan(response.token,response.client_id);
          
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error('verifica usuario y contraseña','Error de autenticación');
          }
        }
      });
    }
  }

  getClientPlan(token:string, client_id : string): void {
    this.plansService.getClientPlan(client_id).subscribe(
      (response) => {
        if (typeof response === 'string' || Object.keys(response).length === 0 ) {
          // Si la respuesta es un mensaje de texto, no hay plan asignado
          this.router.navigate(['clients/plan-selection']);
        } else {
          // Si la respuesta es un objeto Plan
          this.plan = response as Plan;
          this.getClientData();
          this.router.navigate(['clients/dashboard']);
        }
      },
      (error) => {
        console.error('Error fetching client plan:', error);
         this.toastr.error('no se pudo obtener el plan','Error de carga');
      }
    );


  }


  getClientData(): void {
    const token = sessionStorage.getItem('token');
    const client_id = sessionStorage.getItem('client_id');
    if (token && client_id) {

      this.clientsAuthService.getClientData(token, client_id).subscribe({
        next: (response) => {
          if (typeof response === 'string') {
            this.toastr.error(response,'Error de carga');
          } else {
            // Si la respuesta es un objeto ClientPlan
            this.clientPlan = response as ClientPlan;
            if(this.clientPlan.plan === null){
      
              this.router.navigate(['clients/plan-selection']);
            }else{
              sessionStorage.setItem('client_plan', "");
              sessionStorage.setItem('client_plan', JSON.stringify(response));
              this.router.navigate(['clients/dashboard']);
            }

      
          }
        },
        error: (error) => {
          console.error('Error fetching client data:', error);
        }
      });
    }
  }

}
