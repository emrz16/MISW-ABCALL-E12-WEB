import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { ConsultaIncidenciasComponent } from './consulta-incidencias/consulta-incidencias.component';

const routes: Routes = [
  { path: 'crear-incidencia', component: CrearIncidenciaComponent },
  { path: 'incidencias', component: ConsultaIncidenciasComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
