import { FlightService } from './../../../services/flight.service';
import { Airport } from './../../../Models/airport';
import { Component, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filter } from 'src/app/Models/filter';
import { AirportService } from 'src/app/services/airport.service';
import { Flight } from 'src/app/Models/Flight';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';
import { unitOfTime } from 'moment';
import { Router } from '@angular/router';
import { SearchListFlightComponent } from '../search-list-flight/search-list-flight.component';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],

})
export class SearchBarComponent implements OnInit {

  searchBarForm: FormGroup;
  listAirportsDep: Airport[];
  selectedAirportDep: any;
  listAirportsArriv: Airport[];
  selectedAirportArriv: any;
  submitted = false;
  filter: Filter = new Filter();
  airport: Airport = new Airport();
  flight: Flight = new Flight();
  currentDate: string;
  listFlights: Flight[];
  showHomePage: boolean = true;
  showListFlightPage: boolean = false;
  allAirports: Airport[];

  constructor(private formBuilder: FormBuilder,
    private airportService: AirportService,
    private flightService: FlightService,
    private router: Router) {
    this.searchBarForm = this.formBuilder.group({
      airportDep: ['', Validators.required],
      dateDep: ['', Validators.required],
      airportArriv: ['', Validators.required],
    })
  }
  get f() { return this.searchBarForm.controls; }

  getAllAirports() {
    this.airportService.getAllAirports().subscribe((airports) => {
      this.listAirportsDep = airports;
      this.listAirportsArriv = airports;
      this.allAirports = airports;
    })
  }

  formatDate(date: Date) {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();

  }

  ngOnInit(): void {
    this.getAllAirports();
    this.getCurrentDate();
  }

  selectAirport(event: Airport) {
    this.listAirportsArriv = this.allAirports;
    this.listAirportsArriv = this.listAirportsArriv.filter(a => a.airportId != event.airportId);
  }

  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.currentDate = yyyy + "-" + mm + "-" + dd;
  }

  search() {
    this.submitted = true;
    if (this.searchBarForm.valid) {
      this.flightService.getFlightByFilter(this.filter).subscribe((data) => {
        for (let element of data) {
          element.bagCost = this.getAleatoire();
          element.seat = this.getAleatoire();
          element.duration = this.getNumberofHours(element.datearriv, element.datedep);
        }
        this.listFlights = data;
        this.showHomePage = false;
        this.showListFlightPage = true;
      })
    }
  }

  getAleatoire() {
    return Math.floor(Math.random() * (14)) + 20;
  }

  getNumberofHours(datearriv: Date, datedep: Date) {
    datearriv = new Date(datearriv);
    datedep = new Date(datedep);
    let msBetweenDates = datearriv.getTime() - datedep.getTime();
    let seconds = Math.floor(msBetweenDates / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);

    let duration = hours + " h " + minutes % 60;
    return duration;

  }


}

