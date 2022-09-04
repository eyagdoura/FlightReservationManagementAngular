import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, retry } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getClientByEmail(email_address: string): Observable<Client> {
    return this.httpClient.get<Client>(environment.API_URL + "Client/getClientByEmail/" + email_address, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  errorHandler(error: any) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
