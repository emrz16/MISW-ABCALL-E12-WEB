import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
import { Observable } from 'rxjs';
import { Board } from './Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private clientId: string = '06e75e97-e2b7-44bc-854c-950592f32fb2';
  private token: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjbGllbnRfaWQiOiIwNmU3NWU5Ny1lMmI3LTQ0YmMtODU0Yy05NTA1OTJmMzJmYjIiLCJleHAiOjE3Mjg5NTU1NjQsImlhdCI6MTcyODk1MTk2NCwianRpIjoiYjVjNTkwMzQtYTdiMC00NmE4LWE1NDYtZmFkZTkxZjY0YTkxIn0.ISqGN53W7fhUgt-JrnxEXFjH8Mc-ZU5KkhGd1ibmNjs';
  private apiUrl: string = environment.baseUrl + 'reports/'+ this.clientId;

  constructor(private http: HttpClient) { }

  getBoard(): Observable<Board> {   
    // Definir los encabezados con el token
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${this.token}`
    });

    // Realizar la solicitud con los encabezados
    return this.http.post<Board>(this.apiUrl, null, { headers });
  }

}
