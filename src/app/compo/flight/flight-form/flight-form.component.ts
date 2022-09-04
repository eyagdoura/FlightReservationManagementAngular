import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-flight-form',
  templateUrl: './flight-form.component.html',
  styleUrls: ['./flight-form.component.css']
})
export class FlightFormComponent implements OnInit {

  createFlightForm: FormGroup;
  websiteList: any = ['Javatpoint.com', 'HDTuto.com', 'Tutorialandexample.com'];

  constructor(private formBuilder: FormBuilder) {
    this.createFlightForm = this.formBuilder.group({
      cityDep: ['', Validators.required],
    })
  }

  ngOnInit(): void {
  }

  selectCityDep(event: any) {

  }

  filterCity() {

  }

}
