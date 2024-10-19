import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


interface LoginResponse {
  msg: string;
  token: string;
  client_id: string;
}


@Injectable({
  providedIn: 'root'
})
export class ClientsAuthService {
  private apiUrl: string = environment.baseUrl + '/clients/login';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginResponse> {
   
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      email: email,
      password: password
    };

     // Realizar la solicitud HTTP POST y devolver todo el objeto LoginResponse
     return this.http.post<LoginResponse>(this.apiUrl, body, { headers });
  }
}