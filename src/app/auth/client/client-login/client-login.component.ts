import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientsAuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-client-login',
  templateUrl: './client-login.component.html',
  styleUrls: ['./client-login.component.css']
})
export class ClientLoginComponent implements OnInit {

  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private clientsAuthService: ClientsAuthService,private router: Router) {
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
      this.clientsAuthService.login(email, password).subscribe(
        (response) => {
          console.log('response token:', response.token);
          console.log('response client_id:', response.client_id);
          
          localStorage.setItem('token', response.token);
          localStorage.setItem('client_id', response.client_id);
          this.error = null;
          this.router.navigate(['clients/board']);
        },
        (error) => {
          console.error('Error al iniciar sesión:', error);
          this.error = 'Login failed. Please check your credentials.';
        }
      );
    } else {
      this.error = 'Please fill in the form correctly.';
    }
  }

}
