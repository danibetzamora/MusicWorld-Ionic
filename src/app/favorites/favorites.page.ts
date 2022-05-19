import { Component, OnInit } from '@angular/core';
import { Gig } from "../services/gig.model";
import { GigService} from "../services/gig.service";
import { ActivatedRoute, ParamMap } from '@angular/router'
import { SQLiteService } from '../services/SQLite.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage implements OnInit {

  id: string = '';

  constructor(
    private route: ActivatedRoute,
    private gigService: GigService,
    private sqlite: SQLiteService,
  ) {
    this.sqlite.databaseConn();
   }

  ngOnInit() {
  }

  ionViewDidEnter() {
    this.sqlite.getAllGigs()
  }

}
