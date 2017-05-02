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
  eventsObject: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.date = navParams.get("date");
    this.events = navParams.get("programEvents");
    this.locations = navParams.get("programLocations");
    this.eventsObject = [];

    this.makeEventsObject();
  }

  makeEventsObject() {
    let loc;

    for(let e of this.events) {
      if(e.date == this.date) {
        for(let l of this.locations) {
          if(e.locationID == l.ID) {
            loc = l;
            break;
          }
        }
        this.eventsObject.push({event : e, location: loc});
      }
    }
  }

}
