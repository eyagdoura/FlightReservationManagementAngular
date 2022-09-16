import { Component, Input, OnInit } from '@angular/core';
import { Flight } from 'src/app/Models/Flight';
import { FlightService } from 'src/app/services/flight.service';

@Component({
  selector: 'app-search-list-flight',
  templateUrl: './search-list-flight.component.html',
  styleUrls: ['./search-list-flight.component.css']
})
export class SearchListFlightComponent implements OnInit {
  @Input() listFlights: Flight[];

  constructor(private flightService: FlightService) { }

  ngOnInit(): void {
  }

}
