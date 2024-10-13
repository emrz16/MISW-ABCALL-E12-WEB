import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
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

  private apiUrl = 'https://tu-api.com/incidencias';

  constructor(private http: HttpClient) { }

  // Método para crear una nueva incidencia
  crearIncidencia(incidencia: Incidencia): Observable<any> {
    console.log(incidencia);
    return this.http.post<any>(this.apiUrl, incidencia)
      .pipe(
        catchError(this.handleError)
      );
  }

  // Manejo de errores
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Error del cliente o de red
      console.error('Ocurrió un error:', error.error.message);
    } else {
      // Backend retornó un código de error
      console.error(
        `Backend retornó el código ${error.status}, ` +
        `mensaje: ${error.message}`);
    }
    // Retorna un observable con un mensaje de error amigable
    return throwError('Algo malo sucedió; por favor, intenta de nuevo más tarde.');
  }
}