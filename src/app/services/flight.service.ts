import { Filter } from './../Models/filter';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, delay, map, retry } from 'rxjs/operators'
import { Flight } from '../Models/Flight';


@Injectable({
  providedIn: 'root'
})
export class FlightService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  private listFlights: Flight[] = [];

  getListFlights() {
    return this.listFlights;
  }
  setListFlights(listFlights: Flight[]) {
    this.listFlights = listFlights;
  }

  constructor(private httpClient: HttpClient) { }

  getFlight(): Observable<Flight[]> {
    return this.httpClient.get<Flight[]>(environment.API_URL + "Flight/getFlights/", this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  addNewFlight(flight: Flight): Observable<Flight> {
    return this.httpClient.post<Flight>(environment.API_URL + "Flight/addNewFlight", JSON.stringify(flight), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }
  getFlightByFilter(filter: Filter): Observable<Flight[]> {
    return this.httpClient.post<Flight[]>(environment.API_URL + "Flight/getFlightsByFilter", JSON.stringify(filter), this.httpOptions)
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
