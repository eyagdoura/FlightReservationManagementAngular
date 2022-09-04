import { ClientService } from './../../services/client.service';
import { Client } from './../../Models/client';
import { InscriptionService } from 'src/app/services/inscription.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.css']
})
export class InscriptionComponent implements OnInit {

  inscriForm: FormGroup;
  submitted = false;
  user: Client = new Client();
  existClient: boolean;

  constructor(private formBuilder: FormBuilder,
    private inscriptionService: InscriptionService,
    private router: Router,
    private clientService: ClientService) {
    this.inscriForm = this.formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email_address: ['', [Validators.required, Validators.email]],
      phone: ['', [Validators.required, Validators.pattern("[0-9]{8}")]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    })
  }
  get f() { return this.inscriForm.controls; }

  ngOnInit(): void {
  }

  onSubmit() {
    this.submitted = true;
    this.existClient = false;
    if (this.inscriForm.valid) {
      this.clientService.getClientByEmail(this.user.email_address).subscribe((client) => {
        if (client == null) {
          this.user.role = "CLIENT";
          this.inscriptionService.subscribeClient(this.user).subscribe((client) => {
            this.router.navigate(['/login']);
          });
        } else {
          this.existClient = true;
        }
      });
    }
  }

}

