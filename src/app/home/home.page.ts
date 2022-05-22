import { Component } from '@angular/core';
import { Gig } from "../services/gig.model";
import { GigService} from "../services/gig.service";
import { Observable } from 'rxjs';
import { ModalController, IonRouterOutlet } from '@ionic/angular';
import { SQLiteService } from '../services/SQLite.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  
  gigs: Gig[] = [];

  constructor(
    private gigService: GigService,
    private sqlite: SQLiteService,
  ) { 
    this.sqlite.databaseConn();
  }

  ngOnInit(): void {
    this.getGigs();
  }

  ionViewDidEnter() {
    this.sqlite.getAllGigs()
  }

  public getGigs(){
    this.gigService.getList().subscribe(
      (res: any) => this.gigs = res.map(
        (item: any) => ({ ...item.data(), 'id': item.id})
      ) as Gig[]
    );
  }
}