import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private router: Router) { }

  onSubmit() {
    if (this.email === 'admin@example.com' && this.password === 'password') {
      // Ejemplo simple de autenticación (deberías hacer esto con un servicio)
      console.log('Login exitoso');
      this.router.navigate(['/']);  // Redirige a la página principal después del login
    } else {
      alert('Credenciales incorrectas');
    }
  }
}
