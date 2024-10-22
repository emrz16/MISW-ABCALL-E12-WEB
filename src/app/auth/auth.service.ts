import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, Observable } from 'rxjs';


interface LoginResponse {
  msg: string;
  token: string;
  client_id: string;
}

interface LoginAgentResponse{
  verification_id: string;
  security_question: string;
}

interface LoginAgentQuestionResponse{
  msg: string;
  token: string;
  agent_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class ClientsAuthService {
  private apiUrl: string = environment.baseUrl + 'clients/login';

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

@Injectable({
  providedIn: 'root'
})
export class AgentsAuthService {
  private apiUrl: string = environment.baseUrl + 'agents/login';
  private securityAnswerUrl: string = environment.baseUrl + 'agents/verify-security-answer';
  constructor(private http: HttpClient) { }

  login(email: string, password: string){

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    const body = {
      email: email,
      password: password
    };

    this.http.post<LoginAgentResponse>(this.apiUrl, body, { headers }).subscribe(
      (response) => {
        const bodyAnswer = {
          verification_id: response.verification_id,
          answer: "Andres admin"
      }
        this.http.post<LoginAgentQuestionResponse>(this.securityAnswerUrl, bodyAnswer, {headers}).subscribe(
          (response) => {
            localStorage.setItem('token', response.token);
            localStorage.setItem('agent_id', response.agent_id);
          }
        )
      });
  }
}
