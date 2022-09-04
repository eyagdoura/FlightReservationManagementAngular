import { Reservation } from './reservation';
import { Administrator } from './administrator';
export class Flight {
    volId: number;
    datedep: Date;
    datearriv: Date;
    price: number;
    num_vol: string;
    reservation: Reservation;
    administrator: Administrator;

}