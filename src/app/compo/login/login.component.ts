import { Router, RouterModule } from '@angular/router';
import { Client } from './../../Models/client';
import { UserService } from './../../services/user.service';
import { Administrator } from './../../Models/administrator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/Models/auth';
import { User } from 'src/app/Models/user';
import { LoginService } from 'src/app/services/login.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;//Création d'une formulaire <form>
  submitted = false;
  authBody: Auth = new Auth();
  user: User = new User();
  errorLogin: boolean;
  admin: Administrator;
  client: Client;


  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService,
    private userService: UserService,
    private router: Router,
    private navbar: NavbarService) {
    this.loginForm = this.formBuilder.group({
      email_address: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
    this.navbar.hide();
  }

  onSubmit() {
    this.submitted = true;
    this.errorLogin = false;
    console.log(JSON.stringify(this.user));
    this.loginService.login(this.authBody).subscribe((data) => {
      if (data == null) {
        this.errorLogin = true;
      }
      else if (data.role == "ADMIN") {
        localStorage.setItem('ADMIN', JSON.stringify(data));
        this.router.navigate(['/createFlight']);
        this.navbar.show();
      }
      else if (data.role == "CLIENT") {
        localStorage.setItem('CLIENT', JSON.stringify(data));
        this.router.navigate(['']);
        this.navbar.show();
      }
    });
  }

}
