import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';
import { AuthComponent } from './auth.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClientLoginComponent } from './client/client-login/client-login.component';
import { ClientRegisterComponent } from '../client/client-register/client-register.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule

  ],
  declarations: [AuthComponent, ClientLoginComponent],
})
export class AuthModule { }
