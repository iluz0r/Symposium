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
  }

}
