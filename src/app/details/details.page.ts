import { Component, OnInit } from '@angular/core';
import { Gig } from "../services/gig.model";
import { GigService} from "../services/gig.service";
import { ActivatedRoute, ParamMap } from '@angular/router'
import { SQLiteService } from '../services/SQLite.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  id: string = '';
  gig: Gig = new Gig;
  //isFav: string;
  //fav: boolean;

  constructor(
    private route: ActivatedRoute,
    private gigService: GigService,
    private sqlite: SQLiteService,
  ) {
    //this.sqlite.databaseConn();
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ?? '';
      this.getGig();
    });
    //this.getFav(this.id);
  }
/*
  getFav(id):boolean {
    this.sqlite.getAllGigs()
    for(let i=0; i<this.sqlite.FAVS.length; i++){
      if(this.sqlite.FAVS[i].id == id) {
        return true;
      }
    }
    return false;
  }
*/
  public getGig() {
    this.gigService.getDocument(this.id).subscribe(
      (res: any) => this.gig = ({...res.data(), 'id': res.id}) as Gig
    );
      /*
    this.sqlite.getFav(this.gig.user_username);
    this.isFav = this.sqlite.isGigFav;
    */
  }

  public addFav(name,id,image) {
    this.sqlite.addGig(name,id,image);
    //document.getElementById('hola').style.display = 'none';
  }

  public deleteFav(id) {
    //let newI = String(i);
    this.sqlite.deleteGig(id);
    //this.global.myGlobalVar = false;
  }

  getFav(id):boolean {
    for (let fav of this.sqlite.FAVS) {
      if (fav.id === id) {
        return true;
      } 
    }
    return false;
  }
  /*
  getFav(id) {
    this.sqlite.isGigFav(id);
    this.fav = this.sqlite.isFav;
  }
  */
}
