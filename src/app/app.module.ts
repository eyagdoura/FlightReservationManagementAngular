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

@NgModule({
  declarations: [
    AppComponent,
    InscriptionComponent,
    LoginComponent,
    FlightFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [
    InscriptionService, LoginService],
  bootstrap: [AppComponent]
})
export class AppModule { }
