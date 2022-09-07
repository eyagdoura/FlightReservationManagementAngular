import { City } from './../Models/city';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, retry } from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class CityService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  getCitiesByCountry(idCountry: number): Observable<City[]> {
    return this.httpClient.get<City[]>(environment.API_URL + "City/getCitiesByCountry/" + idCountry, this.httpOptions)
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
