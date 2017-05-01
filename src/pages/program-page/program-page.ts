import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';

@Component({
  selector: 'page-program',
  templateUrl: 'program-page.html',
})
export class ProgramPage {

  date: any;
  events: any;
  locations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = navParams.get("date");
    this.events = navParams.get("programEvents");
    this.locations = navParams.get("programLocations");

    // I DATI POTREI ORDINARLI QUI.. NEL SENSO CHE POTREI DEFINIRE UN VETTORE DI EVENTS A CUI POTREI AGGIUNGERE LA LOCATION CORRISPONDENTE COME DI SEGUITO
    /*
    this.events = [];
    for(let e of this.events) {
      for(let l of this.locations) {
        if(e.locationID == l.ID) {
          this.events.add({event : e, location: l});
        }
      }
    }
    */
  }

}
