import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css']
})
export class SearchBarComponent implements OnInit {

  createFlightForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
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

  items = [
    {id: 1, name: 'Python'},
    {id: 2, name: 'Node Js'},
    {id: 3, name: 'Java'},
    {id: 4, name: 'PHP', disabled: true},
    {id: 5, name: 'Django'},
    {id: 6, name: 'Angular'},
    {id: 7, name: 'Vue'},
    {id: 8, name: 'ReactJs'},
  ];

  ngOnInit(): void {
  }

  CreateVol(){
    
  }
}
