import { FlightService } from './services/flight.service';
import { CompanyService } from './services/company.service';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InscriptionComponent } from './compo/inscription/inscription.component';
import { InscriptionService } from './services/inscription.service';
import { LoginComponent } from './compo/login/login.component';
import { LoginService } from './services/login.service';
import { FlightFormComponent } from './compo/flight/flight-form/flight-form.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { DlDateTimeDateModule, DlDateTimePickerModule } from 'angular-bootstrap-datetimepicker';
import { SearchBarComponent } from './compo/search/search-bar/search-bar.component';
import { HomePageComponent } from './compo/home-page/home-page.component';
import { SearchListFlightComponent } from './compo/search/search-list-flight/search-list-flight.component';
import { ReservationFormComponent } from './compo/reservation/reservation-form/reservation-form.component';

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    LoginComponent,
    FlightFormComponent,
    SearchBarComponent,
    HomePageComponent,
    SearchListFlightComponent,
    ReservationFormComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgSelectModule,
    DlDateTimeDateModule,  // <--- Determines the data type of the model
    DlDateTimePickerModule
  ],
  providers: [
    InscriptionService,
    LoginService,
    CompanyService,
    FlightService],
  bootstrap: [AppComponent]
})
export class AppModule { }
