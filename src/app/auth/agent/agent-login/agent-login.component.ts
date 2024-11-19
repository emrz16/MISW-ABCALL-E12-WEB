import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AgentsAuthService } from '../../auth.service';

@Component({
  selector: 'app-agent-login',
  templateUrl: './agent-login.component.html',
  styleUrls: ['./agent-login.component.css']
})
export class AgentLoginComponent implements OnInit {

  agentForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder,
    private agentsAuthService: AgentsAuthService,
     private router: Router,
    private toastr: ToastrService,
    ) {

      this.agentForm = this.fb.group({
        email: ['agente@test.com', [Validators.required, Validators.email]],  
        password: ['securepassword', [Validators.required, Validators.minLength(8)]] 
      });

     }

  ngOnInit() {
  }

  login() {
    if (this.agentForm.valid) {
      const { email, password } = this.agentForm.value;


      this.agentsAuthService.login(email, password).subscribe({
        next: (response) => {
          console.log('Login exitoso:', response);
          localStorage.setItem('token', response.token);
          localStorage.setItem('agent_id', response.agent_id);

          this.router.navigate(['agents/dashboard']);
        },
        error: (error) => {
          if (error.status === 401) {
            this.toastr.error('verifica usuario y contraseña','Error de autenticación');
          }else{
            this.toastr.error('Error de conexión','Error de autenticación');
          }
        },
      });
    }
  }



}
