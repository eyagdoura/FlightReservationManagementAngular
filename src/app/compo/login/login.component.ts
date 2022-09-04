import { Administrator } from './../../Models/administrator';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Auth } from 'src/app/Models/auth';
import { User } from 'src/app/Models/user';
import { LoginService } from 'src/app/services/login.service';

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



  constructor(private formBuilder: FormBuilder,
    private loginService: LoginService) {
    this.loginForm = this.formBuilder.group({
      email_address: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  get f() { return this.loginForm.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.errorLogin = false;
    console.log(JSON.stringify(this.user));
    this.loginService.login(this.authBody).subscribe((data) => {
      if (data == null) {
        this.errorLogin = true;
      }
      if (data.role == "ADMIN") {

      }
    });
  }

}
