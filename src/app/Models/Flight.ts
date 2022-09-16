import { Company } from './company';
import { Airport } from './airport';
import { Reservation } from './reservation';
import { Administrator } from './administrator';

export class Flight {
    volId: number;
    datedep: Date;
    datearriv: Date;
    price: number;
    numFlight: string;
    airportDep: Airport;
    airportArriv: Airport;
    reservation: Reservation[];
    administrator: Administrator;
    company: Company;
    duration: string;
    bagCost: number;
    seat: number;
}