import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';

const routes: Routes = [
  { path: 'crear-incidencia', component: CrearIncidenciaComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
