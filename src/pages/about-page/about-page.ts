import {Component} from '@angular/core';
import * as Confs from '../../app/app.conf';

@Component({
  selector: 'about-page',
  templateUrl: 'about-page.html',
})
export class AboutPage {

  name = Confs.infos.conferenceName;
  logo = Confs.infos.conferenceLogo;
  overview = Confs.infos.conferenceOverview;
  startDate = Confs.infos.startDate;
  endDate = Confs.infos.endDate;
  venue = Confs.infos.conferenceVenue;
  organizers = Confs.infos.conferenceOrganizers;

  constructor() {
  }
}

