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
import { AgentDashboardComponent } from './agent/agent-dashboard/agent-dashboard.component';
import { AgentRegisterComponent } from './agent/agent-register/agent-register.component';
import { AgentLoginComponent } from './auth/agent/agent-login/agent-login.component';
import { UpdateIncidenciaComponent } from './update-incidencia/update-incidencia.component';

const routes: Routes = [
  {path: 'clients/login2', component:AuthComponent},
  {path: 'clients/board', component:BoardComponent},
  {path: 'clients/login', component:ClientLoginComponent},
  {path: 'clients/register', component:ClientRegisterComponent},
  {path: 'clients/recover', component:ClientRecoverComponent},
  { path: 'incidents', component: CrearIncidenciaComponent },
  {path: 'clients/plan-selection', component: ClientPlanComponent},
  {path: 'clients/dashboard', component: ClientDashboardComponent},
  {path: 'agents/dashboard', component: AgentDashboardComponent},
  {path: 'agents/register', component: AgentRegisterComponent},
  {path: 'agents/login', component: AgentLoginComponent},
  {path: 'agents/recover', component:ClientRecoverComponent},
  {path: 'incident/update', component:UpdateIncidenciaComponent}
  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
