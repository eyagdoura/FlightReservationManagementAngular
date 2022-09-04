import { Airport } from './airport';
import { Flight } from './Flight';

export class Stopover {
    airportId: Airport;
    volId: Flight;
    dateDep: Date;
    dateArriv: Date;
    vol: Flight;
    airport: Airport;
}