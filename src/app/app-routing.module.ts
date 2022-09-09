import { FlightFormComponent } from './compo/flight/flight-form/flight-form.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InscriptionComponent } from './compo/inscription/inscription.component';
import { LoginComponent } from './compo/login/login.component';
import { SearchBarComponent } from './compo/search/search-bar/search-bar.component';
import { HomePageComponent } from './compo/home-page/home-page.component';

const routes: Routes = [
  { path: 'inscription', component: InscriptionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'createFlight', component: FlightFormComponent },
  { path: 'searchBar', component: SearchBarComponent },
  { path: 'homePage', component: HomePageComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
