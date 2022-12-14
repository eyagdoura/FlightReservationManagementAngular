import { Client } from './../Models/client';
import { Administrator } from './../Models/administrator';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public getAdminConnected(): Administrator {
    //@ts-ignore
    return JSON.parse(localStorage.getItem("ADMIN"));
  }
  public getClientConnected(): Client {
    //@ts-ignore
    return JSON.parse(localStorage.getItem("CLIENT"));
  }

  public setClientConnected(client: Client) {
    return JSON.parse(localStorage.getItem("CLIENT") || '{}');
  }

  constructor() { }
}
