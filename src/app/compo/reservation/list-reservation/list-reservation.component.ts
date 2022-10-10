import { UserService } from './../../../services/user.service';
import { Reservation } from './../../../Models/reservation';
import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client';
import { ReservationService } from 'src/app/services/reservation.service';

@Component({
  selector: 'app-list-reservation',
  templateUrl: './list-reservation.component.html',
  styleUrls: ['./list-reservation.component.css']
})
export class ListReservationComponent implements OnInit {
  listReservation: Reservation[];
  connectedClient = false;
  client: Client = new Client();

  constructor(private reservationService: ReservationService,
    private userService: UserService) { }

  ngOnInit(): void {
    this.client = this.userService.getClientConnected();
    this.getReservationByClient();
  }
  getReservationByClient() {
    this.reservationService.getReservationByClient(this.client.id).subscribe((reservations) => {

      this.listReservation = reservations;
      console.log(this.listReservation);
      console.log(reservations);


    })
  }
}
