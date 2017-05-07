import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {PaperInfoPage} from '../paperinfo-page/paperinfo-page';
import {PresenterInfoPage} from '../presenterinfo-page/presenterinfo-page';

@Component({
  selector: 'page-program',
  templateUrl: 'program-page.html',
})
export class ProgramPage {
  date: any;
  events: any;
  locations: any;
  eventsArray: any;
  papers: any;
  presenters: any;
  chairs: any;

  constructor(public app: App, public navParams: NavParams, public navCtrl: NavController) {
    this.date = navParams.get("date");
    this.events = navParams.get("programEvents");
    this.locations = navParams.get("programLocations");
    this.papers = navParams.get("programPapers");
    this.presenters = navParams.get("programPresenters");
    this.chairs = navParams.get("programChairs");
    this.eventsArray = [];

    this.makeEventsArray();
  }

  openPaperInfoPage(paper) {
    this.app.getRootNav().push(PaperInfoPage, {paperInfo: paper});
  }

  makeEventsArray() {
    let loc, papersInfo, chair;

    for (let e of this.events) {
      if (e.date == this.date) {
        for (let l of this.locations) {
          if (e.locationID == l.ID) {
            loc = l;
            break;
          }
        }
        papersInfo = [];
        if (e.type != '2') {
          for (let p of this.papers) {
            if (p.eventID == e.ID) {
              papersInfo.push(p);
            }
          }
          for (let c of this.chairs) {
            if (c.EID == e.chairEID) {
              chair = c;
              break;
            }
          }
        }
        this.eventsArray.push({event: e, location: loc, eventPapers: papersInfo, eventChair: chair});
      }
    }
  }

  openPresenterInfoPage(pres) {
    this.app.getRootNav().push(PresenterInfoPage, {presenter: pres});
  }

}
