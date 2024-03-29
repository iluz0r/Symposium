import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {ProgramPage} from '../program-page/program-page';

@Component({
  selector: 'programtab-page',
  templateUrl: 'programtab.html',
})
export class ProgramTab {
  rootPage: any;
  dates: any;
  events: any;
  locations: any;
  papers: any;
  presenters: any;
  chairs: any;

  constructor(public navParams: NavParams) {
    this.rootPage = ProgramPage;
    this.dates = navParams.get("programDates");
    this.events = navParams.get("programEvents");
    this.locations = navParams.get("programLocations");
    this.papers = navParams.get("programPapers");
    this.presenters = navParams.get("programPresenters");
    this.chairs = navParams.get("programChairs");
  }
}
