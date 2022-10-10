import { Reservation } from './../Models/reservation';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  createReservation(reservation: Reservation): Observable<Reservation> {
    return this.httpClient.post<Reservation>(environment.API_URL + "Reservation/addReservation", JSON.stringify(reservation), this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      )

  }

  getReservationByClient(id: number): Observable<Reservation[]> {
    return this.httpClient.get<Reservation[]>(environment.API_URL + "Reservation/getReservationByClient/" + id, this.httpOptions)
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
