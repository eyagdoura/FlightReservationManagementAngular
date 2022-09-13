import { FlightService } from './../../../services/flight.service';
import { Airport } from './../../../Models/airport';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Filter } from 'src/app/Models/filter';
import { AirportService } from 'src/app/services/airport.service';
import { Flight } from 'src/app/Models/Flight';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';
import { unitOfTime } from 'moment';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],

})
export class SearchBarComponent implements OnInit {

  createFlightForm: FormGroup;
  listAirportsDep: Airport[];
  selectedAirportDep: any;
  listAirportsArriv: Airport[];
  selectedAirportArriv: any;
  submitted = false;
  filter: Filter = new Filter();
  airport: Airport = new Airport();
  flight: Flight = new Flight();
  currentDate: string;
  // currentDate: string = new Date().toLocaleDateString().split('/').join('-');

  constructor(private formBuilder: FormBuilder,
    private airportService: AirportService) {
    this.createFlightForm = this.formBuilder.group({
      countryDep: ['', Validators.required],
      cityDep: ['', Validators.required],
      airportDep: ['', Validators.required],
      dateDep: ['', Validators.required],
      countryArriv: ['', Validators.required],
      cityArriv: ['', Validators.required],
      airportArriv: ['', Validators.required],
      dateArriv: ['', Validators.required],
      company: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      numFlight: ['', Validators.required]
    })
  }
  get f() { return this.createFlightForm.controls; }

  getAllAirports() {
    this.airportService.getAllAirports().subscribe((Airports) => {
      this.listAirportsDep = Airports;
      this.listAirportsArriv = Airports;
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
    this.listAirportsArriv = this.listAirportsArriv.filter(a => a.airportId != event.airportId);
  }

  getCurrentDate() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();
    this.currentDate = yyyy + "-" + mm + "-" + dd;
  }

  CreateVol() {
    this.submitted = true;
    console.log(JSON.stringify(this.filter));
    this.airportService.getAllAirports().subscribe((data) => {

    })
  }


}

