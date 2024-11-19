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
