import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CrearIncidenciaComponent } from './crear-incidencia/crear-incidencia.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthComponent } from './auth/auth.component';
import { CommonModule } from '@angular/common';
import { BoardComponent } from './board/board.component';
import { AuthModule } from './auth/auth.module';
import { ClientPlanComponent } from './client/client-plan/client-plan.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ClientRegisterComponent } from './client/client-register/client-register.component';
import { ClientDashboardComponent } from './client/client-dashboard/client-dashboard.component';

@NgModule({
  declarations: [
    AppComponent,
    CrearIncidenciaComponent,
    BoardComponent,
    ClientPlanComponent,
    ClientDashboardComponent,
    ClientRegisterComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    NgxPaginationModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      timeOut: 7000, 
      closeButton: true,
      preventDuplicates: true
    }),
    AuthModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
