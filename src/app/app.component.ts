import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from "@angular/router";
import {AuthenticateService} from "./services/authentication.service";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  private is_authenticated = null;

  constructor(private menu: MenuController, private router: Router, private authenticationService: AuthenticateService) {
    this.authenticationService.authDetails().subscribe(
      (user) => this.is_authenticated = (user != null)
    )
  }

  redirect(page) {
    this.router.navigate([page]);
    this.menu.close();
  }
  
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

  logout(){
    this.authenticationService.logoutUser().then( () => this.redirect('login') );
  }

}
