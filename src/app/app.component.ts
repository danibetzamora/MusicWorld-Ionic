import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  constructor(private menu: MenuController, private router: Router) {}

  redirect(page) {
    this.router.navigate([page]);
    this.menu.close();
  }
  
  openCustom() {
    this.menu.enable(true, 'custom');
    this.menu.open('custom');
  }

}
