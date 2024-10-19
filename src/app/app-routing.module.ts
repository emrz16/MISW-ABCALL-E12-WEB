import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BoardComponent } from './board/board.component';
import { AuthComponent } from './auth/auth.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { ConsultaIncidenciasComponent } from './consulta-incidencias/consulta-incidencias.component';

const routes: Routes = [
  {path: 'clients/board', component:BoardComponent},
  {path: 'clients/login', component:AuthComponent},
  { path: 'incidents', component: CrearIncidenciaComponent },
  { path: 'incidents/create', component: ConsultaIncidenciasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
