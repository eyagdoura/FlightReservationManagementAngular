import { City } from "./city";
import { Flight } from "./Flight";

export class Airport {
    airportId: number;
    name: string;
    abbreviation: string;
    vols_dep: Flight[];
    vols_arri: Flight[];
    city: City;
}