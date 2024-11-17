import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../environments/environment';

export interface Incidencia {
  agent_id: string;
  description: string;
  date: string;
  registration_medium: string;
  user_id: number;
  client_id: string;
}

export interface IncidentSuggestionResponse{
  incident_id: string,
  description: string,
  possible_solution: string
}

@Injectable({
  providedIn: 'root'
})
export class IncidenciaService {

  private apiUrl = environment.baseUrl + 'incidents';
  private apiUrlSuggestions = environment.baseUrl + 'incidents/';
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

  getIncidentSuggestion(incident_id: string): Observable<IncidentSuggestionResponse>{
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<IncidentSuggestionResponse>(this.apiUrlSuggestions + incident_id + "/solution", {headers})
      .pipe(
        catchError(this.handleError)
      );
  }

  getIncidentPosibleSolution(): Observable<IncidentSuggestionResponse>{
    const mockResponse: IncidentSuggestionResponse = {
      incident_id: '12345',
      description: 'El sistema muestra un error al iniciar sesión.',
      possible_solution: 'Revisar las credenciales ingresadas o reiniciar la aplicación.',
    };

    return of(mockResponse); // Simula una respuesta como un Observable


    /*
    const token = localStorage.getItem("token");
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    return this.http.get<IncidentSuggestionResponse>(this.apiUrlSuggestions + "/solution", {headers})
      .pipe(
        catchError(this.handleError)
      );
      */

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
