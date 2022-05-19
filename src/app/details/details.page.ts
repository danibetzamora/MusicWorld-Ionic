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
  ) {
    this.sqlite.databaseConn();
  }

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

  public addFav(name,i) {
    this.sqlite.addGig(name,i);
  }

  public deleteFav(i) {
    let newI = String(i);
    this.sqlite.deleteGig(newI);
  }

}
