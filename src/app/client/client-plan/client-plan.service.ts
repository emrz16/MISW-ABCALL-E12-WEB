import { Injectable } from '@angular/core';
import { catchError, map, Observable, of, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Plan } from './Plan';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpStatusCode } from '@angular/common/http';
import { ClientPlan } from './client-plan';

@Injectable({
  providedIn: 'root'
})
export class ClientPlanService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) {}

  
  getPlans(token: string | null): Observable<Plan[]> {
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });

    return this.http.get<Plan[]>(this.apiUrl + 'plans',{headers}).pipe(
      catchError(this.handleError)
    );
  }

  
  assignPlanToClient(token: string, clientId: string, planId: string): Observable<ClientPlan> {
    
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    });
    const url = `${environment.baseUrl}clients/${clientId}/plan/${planId}`;
   
    return this.http.post<ClientPlan>(url, { observe: 'response' }, { headers }).pipe(
      map(response => {
          return response as ClientPlan;
      }),
      catchError((error: HttpErrorResponse) => {
      
        return throwError(() => new Error('Error al obtener el plan del cliente'));
      })
    );
  }

  getClientPlan(clientId: string): Observable<Plan | string> {
    const url = `${this.apiUrl}clients/${clientId}/plan`;
    return this.http.get<Plan>(url, { observe: 'response' }).pipe(
      map(response => {
        // Si el status es 200, devuelve el cuerpo de la respuesta

          return response.body as Plan;
      }),
      catchError((error: HttpErrorResponse) => {
        // Si el status es 404, devuelve el mensaje personalizado o un objeto vacío
        if (error.status === HttpStatusCode.NotFound) {
          return of('Client does not have a Plan assigned');
        }
        // Para cualquier otro status, lanza un error genérico
        return throwError(() => new Error('Error al obtener el plan del cliente'));
      })
    );
  }


  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'Unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      errorMessage = `Server-side error: ${error.status} - ${error.message}`;
    }
    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
