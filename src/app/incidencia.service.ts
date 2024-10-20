import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface Incidencia {
  agent_id: string;
  description: string;
  date: string;
  registration_medium: string;
  user_id: number;
  client_id: string;
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private apiUrl = 'http://localhost:5000/incidents';

  constructor(private http: HttpClient) { }

  // Método para crear una nueva incidencia
  crearIncidencia(incidencia: Incidencia): Observable<any> {
    console.log(incidencia);
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.post<any>(this.apiUrl, incidencia, {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Ocurrió un error:', error.error.message);
    } else {
      console.error(
        `Backend retornó el código ${error.status}, ` +
        `mensaje: ${error.message}`);
    }
    return throwError('Algo malo sucedió; por favor, intenta de nuevo más tarde.');
  }
}