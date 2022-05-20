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

  constructor(
    private route: ActivatedRoute,
    private gigService: GigService,
    private sqlite: SQLiteService,
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.id = params.get('id') ?? '';
      this.getGig();
    });
  }

  public getGig() {
    this.gigService.getDocument(this.id).subscribe(
      (res: any) => this.gig = ({...res.data(), 'id': res.id}) as Gig
    );
  }

  public addFav(name,id,image) {
    this.sqlite.addGig(name,id,image);
  }

  public deleteFav(id) {
    this.sqlite.deleteGig(id);
  }

  getFav(id):boolean {
    for (let fav of this.sqlite.FAVS) {
      if (fav.id === id) {
        return true;
      } 
    }
    return false;
  }
}
