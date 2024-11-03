import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AuthComponent } from './auth/auth.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { ClientLoginComponent } from './auth/client/client-login/client-login.component';
import { ClientRegisterComponent } from './client/client-register/client-register.component';
import { ClientRecoverComponent } from './auth/client/client-recover/client-recover.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';
import { ClientPlanComponent } from './client/client-plan/client-plan.component';

const routes: Routes = [
  {path: 'clients/login2', component:AuthComponent},
  {path: 'clients/board', component:BoardComponent},
  {path: 'clients/login', component:ClientLoginComponent},
  {path: 'clients/register', component:ClientRegisterComponent},
  {path: 'clients/recover', component:ClientRecoverComponent},
  { path: 'incidents', component: CrearIncidenciaComponent },
  {path: 'clients/plan-selection', component: ClientPlanComponent},
  {path: 'clients/dashboard', component: ClientDashboardComponent}
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
