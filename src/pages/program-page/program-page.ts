import {Component} from '@angular/core';
import {App, NavController, NavParams} from 'ionic-angular';
import {PaperInfoPage} from '../paperinfo-page/paperinfo-page';

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

  openPaperInfoPage(papInfo) {
    this.app.getRootNav().push(PaperInfoPage, {paperInfo: papInfo});
  }

  makeEventsArray() {
    let loc, papersInfo, pres, chair;

    for (let e of this.events) {
      if (e.date == this.date) {
        for (let l of this.locations) {
          if (e.locationID == l.ID) {
            loc = l;
            break;
          }
        }
        if (e.type != '2') {
          papersInfo = [];
          for (let p of this.papers) {
            if (p.eventID == e.ID) {
              pres = [];
              for (let pr of this.presenters) {
                for (let paperID of pr.papersID) {
                  if (paperID == p.ID) {
                    pres.push(pr);
                  }
                }
              }
              papersInfo.push({paper: p, presenters: pres});
            }
          }
          for(let c of this.chairs) {
            if (c.EID == e.chairEID) {
              chair = c;
              break;
            }
          }
        }
        this.eventsArray.push({event: e, location: loc, papersInfo: papersInfo, eventChair: chair});
      }
    }
  }

}
