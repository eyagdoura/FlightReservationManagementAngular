import { FlightFormComponent } from './compo/flight/flight-form/flight-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './compo/inscription/inscription.component';
import { LoginComponent } from './compo/login/login.component';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createFlight', component: FlightFormComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
