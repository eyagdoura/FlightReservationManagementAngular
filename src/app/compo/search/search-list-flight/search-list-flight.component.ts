import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Flight } from 'src/app/Models/Flight';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-search-list-flight',
  templateUrl: './search-list-flight.component.html',
  styleUrls: ['./search-list-flight.component.css']
})
export class SearchListFlightComponent implements OnInit {
  @Input() listFlights: Flight[];

  constructor(private flightService: FlightService,
    private router: Router) { }

  ngOnInit(): void {
  }
  reserver(flight: Flight) {
    this.flightService.setSelectedFlight(flight);
    localStorage.setItem("FLIGHT", JSON.stringify(this.flightService));
    this.router.navigate(['reservation']);
  }

}
