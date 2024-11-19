import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, throwError } from 'rxjs';
import { Agent } from '../Agent';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AgenteService {

   private apiUrl: string = environment.baseUrl +'agents'; // Cambia esta URL por la de tu API

  constructor(private http: HttpClient) {}

  crearAgente(agente: any): Observable<Agent> {
    return this.http.post<Agent>(this.apiUrl, agente).pipe(
      map(response => {
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        if (error.error && error.error.msg) {
          return throwError(() => new Error(error.error.msg));
        } else {
          return throwError(() => new Error('Ocurrió un error inesperado. Intente nuevamente.'));
        }
      })
    );
  }

}
