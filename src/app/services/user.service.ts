import { Client } from './../Models/client';
import { Administrator } from './../Models/administrator';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {


  public getAdminConnected(): Administrator {
    return JSON.parse(localStorage.getItem("ADMIN") || '{}');
  }

  public setClientConnected(client: Client) {
    return JSON.parse(localStorage.getItem("CLIENT") || '{}');
  }

  constructor() { }
}
