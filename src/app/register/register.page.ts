import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  private form = {
    name: '',
    surname: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  constructor(private authenticationService: AuthenticateService) { }

  ngOnInit() {}

  register() {
    console.log(this.form);
    this.authenticationService.registerUser(this.form);

  }

}
