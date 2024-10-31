import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { Client } from './Client';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { ClientDto } from './ClientDto';


@Injectable({
  providedIn: 'root'
})
export class ClientRegisterService {

  private apiUrl: string = environment.baseUrl + 'clients/register';


  constructor(private http: HttpClient) { }

  registerClient(client: ClientDto): Observable<Client | { error: string }> {
    return this.http.post<Client>(this.apiUrl, client).pipe(
      map(response => {
        // Si la respuesta es exitosa, devuelve el cliente
        return response;
      }),
      catchError((error: HttpErrorResponse) => {
        // Manejar el error y devolver un Observable con un objeto personalizado
        if (error.error && error.error.msg) {
          // Si el error tiene un mensaje específico, retornarlo como un objeto de error
          return throwError(() => new Error(error.error.msg));
        } else {
          // Si el error es de otro tipo, lanzar un mensaje genérico
          return throwError(() => new Error('Ocurrió un error inesperado. Intente nuevamente.'));
        }
      })
    );
  }


 

}
