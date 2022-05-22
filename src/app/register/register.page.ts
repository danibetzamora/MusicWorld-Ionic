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

  constructor(private authenticationService: AuthenticateService, private router: Router) {}

  ngOnInit() {}

  register() {
    console.log(this.form);

    if (this.isFormValid()) {
      this.authenticationService.registerUser(this.form,
        (res) => this.router.navigate(['home']),
        (err) => {
          if(err.message == "auth/email-already-in-use")
            alert("The email address is already in use by another account.");
          if(err.message == "auth/invalid-email")
            alert("The email address is badly formatted.");
        });
    }else{
      alert(this.buildMessage());
    }
  }

  isFormValid(){
    if(this.form.name == '') return false;
    if(this.form.name.length > 255) return false;
    if(this.form.surname == '') return false;
    if(this.form.surname.length > 255) return false;
    if(this.form.email == '') return false;
    if(this.form.email.length > 255) return false;
    if(this.form.password == '') return false;
    if(this.form.password.length > 255) return false;
    if(this.form.password.length < 6) return false;
    if(this.form.password != this.form.password_confirmation) return false;
    return true;
  }

  buildMessage(){
    let message = "You have entered invalid data:\n";
    if(this.form.name == '') message += " - Name is a required attribute.\n";
    if(this.form.name.length > 255) message += " - Name can not be longer than 255 characters.\n";
    if(this.form.surname == '') message += " - Surname is a required attribute.\n";
    if(this.form.surname.length > 255) message += " - Surname can not be longer than 255 characters.\n";
    if(this.form.email == '') message += " - E-mail is a required attribute.\n";
    if(this.form.email.length > 255) message += " - E-mail can not be longer than 255 characters.\n";
    if(this.form.password == '') message += " - Password is a required attribute.\n";
    if(this.form.password.length > 255) message += " - Password can not be longer than 255 characters.\n";
    if(this.form.password.length < 6) message += " - Password can not be shorter than 6 characters.\n";
    if(this.form.password != this.form.password_confirmation) message += " - Password has to be confirmed.\n";
    return message;
  }

}
