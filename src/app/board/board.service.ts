import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Board } from './Board';

@Injectable({
  providedIn: 'root'
})
export class BoardService {

  private apiUrl: string = environment.baseUrl + 'reports/';

  constructor(private http: HttpClient) { }

  getBoard(token: string | null,client_id:string | null): Observable<Board> {
    // Definir los encabezados con el token
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Board>(this.apiUrl+client_id, { headers });
  }

  getClientReport(client_id: string, user_message: string): Observable<any> {
    const url = `${this.apiUrl}${client_id}`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json'
    });
    const body = {

      user_message: user_message
    };
    return this.http.post<any>(url, body, { headers });
  }

  



}
