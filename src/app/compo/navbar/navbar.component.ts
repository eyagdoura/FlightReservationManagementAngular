import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavbarService } from 'src/app/services/navbar.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  isConnected: boolean;

  constructor(private userService: UserService,
    private router: Router,
    public navbar: NavbarService) { }

  ngOnInit(): void {
   
  }

  ngDoCheck(){
    if(this.userService.getAdminConnected() == null && this.userService.getClientConnected() == null){
      this.isConnected = false;
     }
     else{
      this.isConnected = true;
     }
  }

 LoginOrLogout(){
  if(!this.isConnected){
    this.router.navigate(['/login'])
  }
  else{
    localStorage.clear();
    this.isConnected = false;
    this.router.navigate([''])
  }
 }

}
