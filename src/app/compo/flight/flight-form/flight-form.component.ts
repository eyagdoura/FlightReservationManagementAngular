import { UserService } from './../../../services/user.service';
import { FlightService } from './../../../services/flight.service';
import { AirportService } from './../../../services/airport.service';
import { Airport } from './../../../Models/airport';
import { CityService } from './../../../services/city.service';
import { City } from './../../../Models/city';
import { CountryService } from './../../../services/country.service';
import { Country } from './../../../Models/country';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
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
  selectedAirportDep: any;
  selectedCityDep: any;
  selectedDateDep: string = "";

  /***ARRIVAL***/
  listCountriesArriv: Country[];
  listCitiesArriv: City[];
  selectedCityArriv: any;
  listAirportsArriv: Airport[];
  selectedAirportArriv: any;
  selectedDateArriv: string = "";

  listCompagnies: Company[];
  startDateGetTime: any;
  flight: Flight = new Flight();
  company: Company;
  createFlightForm: FormGroup;
  submitted = false;
  diffDate: Date;
  errorDate: boolean;

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
      dateDep: ['', [Validators.required, this.validateDate]],
      countryArriv: ['', Validators.required],
      cityArriv: ['', Validators.required],
      airportArriv: ['', Validators.required],
      dateArriv: ['', Validators.required],
      company: ['', Validators.required],
      price: ['', [Validators.required, Validators.pattern("[0-9]*")]],
      numFlight: ['', Validators.required]
    }, {
      validator: this.validateDate('dateDep', 'dateArriv'),
    })
  }
  get f() { return this.createFlightForm.controls; }

  //Vérification de nombre d'heures entre la date de départ et la date d'arrivé
  validateDate(controleDateDep: string, controleDateArriv: string) {
    return (formGroup: FormGroup) => {
      let dateDebControle = formGroup.controls[controleDateDep];
      let dateArrivControle = formGroup.controls[controleDateArriv];

      if (dateArrivControle.value != "" && dateArrivControle.value != null && dateArrivControle.value != undefined &&
        dateDebControle.value != "" && dateDebControle.value != null && dateDebControle.value != undefined) {
        let hours = this.getNumberOfHours(dateArrivControle.value, dateDebControle.value);
        if (hours <= 1 || hours > 12) {
          dateDebControle.setErrors({ validateDate: true });
          dateArrivControle.setErrors({ validateDate: true });
        }
        else {
          dateDebControle.setErrors(null);
          dateArrivControle.setErrors(null);
        }
      }
    }
  }

  //Permet de calculer le nombre d'heure entre deux date
  getNumberOfHours(dateArriv: Date, dateDeb: Date) {
    let msBetweenDates = dateArriv.getTime() - dateDeb.getTime();
    let seconds = Math.floor(msBetweenDates / 1000);
    let minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    return hours;
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
    this.cityService.getCitiesByCountry(country.id).subscribe((cities) => {
      if (typeVol == "DEPARTURE") {
        this.listCitiesDep = cities;
        this.selectedCityDep = "";
        this.selectedAirportDep = "";
      } else if (typeVol == "ARRIVAL") {
        this.listCitiesArriv = cities;
        this.listCitiesArriv = this.listCitiesArriv.filter(c => c.cityId != this.selectedCityDep.cityId);
        this.selectedCityArriv = "";
        this.selectedAirportArriv = "";
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

  selectAirport(event: any, typeVol: string) {
    if (typeVol == "DEPARTURE") {
      this.flight.airportDep = event;
      this.selectedAirportDep = event;
    } else if (typeVol == "ARRIVAL") {
      this.flight.airportArriv = event;
      this.selectedAirportArriv = event;
    }
  }

  //les dates ne peut etre séléctionner qu'à partir du mois prochains
  public startDatePickerFilter(dateButton: DateButton, viewName: string): boolean {
    return dateButton.value >= moment().add(1, 'M').startOf('month').valueOf();
  }

  CreateVol() {
    this.submitted = true;
    if (this.createFlightForm.valid) {
      this.FlightService.addNewFlight(this.flight).subscribe((data) => {
        alert("Vol créer avec succés");
      })
    }
  }
}
