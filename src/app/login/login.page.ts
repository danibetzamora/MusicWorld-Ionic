import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../services/authentication.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  private form = {
    email: '',
    password: '',



  };

  constructor(private authenticationService: AuthenticateService ) { }

  ngOnInit() {
  }

  login() {
console.log(this.form);
this.authenticationService.loginUser(this.form);

  }

}
