import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProgramPage} from '../program-page/program-page';

@Component({
  selector: 'page-programtab',
  templateUrl: 'programtab.html',
})
export class ProgramTab {
  rootPage = ProgramPage;
  dates: any;
  events: any;
  locations: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.dates = navParams.get("programDates");
    this.events = navParams.get("programEvents");
    this.locations = navParams.get("programLocations");
  }
}
