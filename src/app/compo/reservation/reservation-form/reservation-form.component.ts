import { ReservationService } from './../../../services/reservation.service';
import { Reservation } from './../../../Models/reservation';
import { UserService } from './../../../services/user.service';
import { Client } from './../../../Models/client';
import { Passager } from './../../../Models/passager';
import { FlightService } from 'src/app/services/flight.service';
import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/Models/Flight';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reservation-form',
  templateUrl: './reservation-form.component.html',
  styleUrls: ['./reservation-form.component.css']
})
export class ReservationFormComponent implements OnInit {
  flight: Flight;
  showDivPassagerList: Boolean = false;
  passagerList: Passager[] = [];
  passager: Passager = new Passager();
  passagerForm: FormGroup;
  totalPrice: number;
  contactForm: FormGroup;
  submitted = false;
  submitted1 = false;
  client: Client = new Client();
  connectedClient = false;
  reservation: Reservation = new Reservation();

  constructor(private formBuilder: FormBuilder,
    private FlightService: FlightService,
    private UserService: UserService,
    private reservationService: ReservationService) {
    this.passagerForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      Date_of_Birth: ['', Validators.required],
      num_passport: ['', Validators.required]
    })
    this.contactForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      phone: ['', Validators.required],
      email_address: ['', Validators.required]
    })
  }
  get f() { return this.contactForm.controls; }
  get f1() { return this.passagerForm.controls; }

  ngOnInit(): void {
    //this.flight = this.FlightService.getSelectedFlight();
    this.flight = JSON.parse(localStorage.getItem('FLIGHT') || '{}').flight;
    if (this.UserService.getClientConnected() == null) {
      this.connectedClient = false;
    } else {
      this.connectedClient = true;
      this.client = this.UserService.getClientConnected();
    }
  }

  addPassager() {
    this.submitted1 = true;
    if (this.passagerForm.valid) {
      this.passagerList.push(this.passager);
      this.passager = new Passager();
      this.passagerForm.reset();
      this.showDivPassagerList = true;
      this.totalPrice = this.flight.price * this.passagerList.length;
    }
  }

  removePassagerFromList(passager: Passager) {
    this.passagerList = this.passagerList.filter(p => p != passager);
    this.totalPrice -= this.flight.price;
  }
  suivant() {
    this.submitted = true;
  }
  getClientInfo(event: any) {
    if (event.target.value != "-1") {
      this.client = new Client();
      this.client.first_name = event.target.value.split(' ')[0];
      this.client.last_name = event.target.value.split(' ')[1];
    } else {
      this.contactForm.reset();
    }
  }
  generateNumReservation() {
    var random = Math.floor(Math.random() * (8999)) + 1000;
    return random;
  }

  valider() {
    this.reservation.client = this.client;
    this.reservation.dateReservation = new Date();
    this.reservation.numReservation = this.generateNumReservation().toString();
    this.reservation.etatReservation = "CONFIRMITE";
    this.reservation.flight = this.flight;

    try {
      for (let passager of this.passagerList) {
        this.reservation.numReservation = passager.first_name[0] + passager.last_name[0] + this.reservation.numReservation
        this.reservation.passager = passager;
        this.reservationService.createReservation(this.reservation).subscribe((data) => {
        });
      }
      alert("Reservation ajouté avec succés");
    }
    catch (ex) {
      console.log(ex);
    }
  }


}
