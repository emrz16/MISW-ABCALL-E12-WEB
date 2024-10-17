import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.development';
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
      'Authorization': `Bearer ${token}`
    });

    // Realizar la solicitud con los encabezados
    return this.http.post<Board>(this.apiUrl+client_id, null, { headers });
  }

}
