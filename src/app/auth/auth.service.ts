import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { catchError, map, Observable, of, switchMap, throwError } from 'rxjs';
import { ClientPlan } from '../client/client-plan/client-plan';


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
     return this.http.post<LoginResponse>(this.apiUrl, body, { headers });
  }



  getClientData(token: string, client_id:string): Observable<ClientPlan | string> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  
    const url = `${environment.baseUrl}clients/${client_id}`;
  
    return this.http.get<ClientPlan>(url, { headers }).pipe(
      catchError((error: HttpErrorResponse) => {
        let errorMessage: string = 'Error al obtener client data';
        
        console.error(errorMessage, error);
        return of(errorMessage);
      })
    );

  }

}

@Injectable({
  providedIn: 'root'
})
export class AgentsAuthService {
  private apiUrl: string = environment.baseUrl + 'agents/login';
  private securityAnswerUrl: string = environment.baseUrl + 'agents/verify-security-answer';


  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<LoginAgentQuestionResponse> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });
  
    const body = {
      email: email,
      password: password,
    };
  
    // Primera solicitud: Login
    return this.http.post<LoginAgentResponse>(this.apiUrl, body, { headers }).pipe(
      switchMap((response) => {
  
        const bodyAnswer = {
          verification_id: response.verification_id,
          answer: "Andres admin",
        };

        return this.http.post<LoginAgentQuestionResponse>(this.securityAnswerUrl, bodyAnswer, { headers });
      })
    );
  }
}
