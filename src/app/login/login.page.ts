import { Component, OnInit } from '@angular/core';
import { AuthenticateService } from "../services/authentication.service";
import {Router} from "@angular/router";
import {MenuController} from "@ionic/angular";
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

  constructor(private authenticationService: AuthenticateService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    this.authenticationService.loginUser(this.form).then( () => this.router.navigate(['home']) );
  }

}
