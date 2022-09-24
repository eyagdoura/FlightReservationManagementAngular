import { Passager } from './passager';
import { Flight } from './Flight';
import { Client } from './client';
export class Reservation {
    id: number;
    dateReservation: Date;
    etatReservation: string;
    client: Client;
    passager: Passager;
    flight: Flight;
    numReservation: string;
}