import { Component } from '@angular/core';
import { Gig } from "../services/gig.model";
import { GigService} from "../services/gig.service";
import { Observable } from 'rxjs';
import { ModalController, IonRouterOutlet } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  /*public gigs: Observable<Gig[]>;

  constructor(
    private gigService: GigService,
    public modalController: ModalController,
    private routerOutlet: IonRouterOutlet
  ) { 
    this.gigs = this.gigService.getGigs();
  }
  */
  gigs: Gig[] = [];

  constructor(
    private gigService: GigService,
  ) { }

  ngOnInit(): void {
    this.getGigs();
  }

  public getGigs(){
    this.gigService.getList().subscribe(
      (res: any) => this.gigs = res.map(
        (item: any) => ({ ...item.data(), 'id': item.id})
      ) as Gig[]
    );
  }
}