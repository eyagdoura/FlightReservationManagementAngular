import { UserService } from './../../../services/user.service';
import { FlightService } from './../../../services/flight.service';
import { AirportService } from './../../../services/airport.service';
import { Airport } from './../../../Models/airport';
import { CityService } from './../../../services/city.service';
import { City } from './../../../Models/city';
import { CountryService } from './../../../services/country.service';
import { Country } from './../../../Models/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DateButton } from 'angular-bootstrap-datetimepicker';
import * as moment from 'moment';
import { CompanyService } from 'src/app/services/company.service';
import { Company } from 'src/app/Models/company';
import { Flight } from 'src/app/Models/Flight';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  /**DEPARTURE**/
  listCountriesDep: Country[];
  listCitiesDep: City[];
  listAirportsDep: Airport[];
  selectedCityDep: any;
  selectedDateDep: string = "";

  /***ARRIVAL***/
  listCountriesArriv: Country[];
  listCitiesArriv: City[];
  selectedCityArriv: any;
  listAirportsArriv: Airport[];
  selectedDateArriv: string = "";

  listCompagnies: Company[];
  startDateGetTime: any;
  flight: Flight = new Flight();
  company: Company;
  createFlightForm: FormGroup;

  constructor(private formBuilder: FormBuilder,
    private countryService: CountryService,
    private cityService: CityService,
    private companyService: CompanyService,
    private airportService: AirportService,
    private FlightService: FlightService,
    private userService: UserService) {
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

  ngOnInit(): void {
    this.getAllCountries();
    this.getAllCompagnies();
  }

  getAllCompagnies() {
    this.companyService.getAllCompagnies().subscribe((compagnies) => {
      this.listCompagnies = compagnies;

    })
  }

  //Récupérer les pays à l'ouverture du formulaire (ngOnInit)
  getAllCountries() {
    this.countryService.getAllCountries().subscribe((countries) => {
      this.listCountriesDep = countries;
      this.listCountriesArriv = countries;
    })
  }

  getVilleByCountry(country: Country, typeVol: string) {
    console.log(typeVol);
    this.cityService.getCitiesByCountry(country.id).subscribe((cities) => {
      if (typeVol == "DEPARTURE") {
        this.listCitiesDep = cities;
        this.selectedCityDep = "";
        this.flight.airportDep = new Airport();
      } else if (typeVol == "ARRIVAL") {
        this.listCitiesArriv = cities;
        this.listCitiesArriv = this.listCitiesArriv.filter(c => c.cityId != this.selectedCityDep.cityId);
        this.selectedCityArriv = "";
        this.flight.airportArriv = new Airport();
      }
    })
  }

  getAirportByCity(city: City, typeVol: string) {
    this.airportService.getAirportsByCity(city.cityId).subscribe((airports) => {
      if (typeVol == "DEPARTURE") {
        this.listAirportsDep = airports;
        this.flight.airportDep = new Airport();
      } else if (typeVol == "ARRIVAL") {
        this.listAirportsArriv = airports;
        this.flight.airportArriv = new Airport();
        this.generateNumFlight();
      }
    })
  }

  generateNumFlight() {
    var random = Math.floor(Math.random() * (8999)) + 1000;
    this.flight.numFlight = this.selectedCityDep.name[0] + this.selectedCityArriv.name[0] + random;
  }

  selectDate(event: any, typeVol: string) {
    if (typeVol == "DEPARTURE") {
      this.selectedDateDep = event?._value?.toLocaleString();
    } else if (typeVol == "ARRIVAL") {
      this.selectedDateArriv = event?._value?.toLocaleString();
    }
  }

  public startDatePickerFilter(dateButton: DateButton, viewName: string): boolean {
    return dateButton.value >= moment().startOf(viewName as moment.unitOfTime.StartOf).valueOf();
  }

  CreateVol() {
    this.flight.administrator = this.userService.getAdminConnected();
    this.FlightService.addNewFlight(this.flight).subscribe((data) => {
      console.log("OK");
    })
  }

}
