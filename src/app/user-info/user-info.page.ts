import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

import { AuthenticateService } from '../services/authentication.service';
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.page.html',
  styleUrls: ['./user-info.page.scss'],
})
export class UserInfoPage implements OnInit {
  private id = null;
  private form = {

      name: '',
      surname:'',
  }

  constructor(private authenticationService: AuthenticateService) { }

  ngOnInit() {
    this.authenticationService.authDetails().subscribe(
      (user)=> {
        
        this.authenticationService.userDetails(user.uid).subscribe(
          (res)=>{
            this.id= res[0].id;
            let userDetails = res[0].data()
            this.form.name = userDetails.name;
            this.form.surname = userDetails.surname;
           
          }
        )
      }    )
  }

  changeInfo(){
    this.authenticationService.updateUserDetails(this.id, this.form.name , this.form.surname).then(
      ()=>alert("Your user info has been updated")
    )
  }



}
