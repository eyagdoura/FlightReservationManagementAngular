import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Client } from '../Models/client';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class InscriptionService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private httpClient: HttpClient) { }

  subscribeClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(environment.API_URL + "Client/addClient", JSON.stringify(client), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )
  }

  //Permet de définir l'erreur reçu par l'api coté back
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


