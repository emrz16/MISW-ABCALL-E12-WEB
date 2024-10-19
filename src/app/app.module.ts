import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms'; 
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { HttpClientModule } from '@angular/common/http';
import { ConsultaIncidenciasComponent } from './consulta-incidencias/consulta-incidencias.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    CrearIncidenciaComponent,
    ConsultaIncidenciasComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
