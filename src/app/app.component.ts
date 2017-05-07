import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ProgramTab} from '../pages/programtab/programtab';
import {PresentersPage} from '../pages/presenters-page/presenters-page';
import {InvitedSpeakersPage} from '../pages/invitedspeakers-page/invitedspeakers-page';

import {DatesService} from '../providers/dates-service';
import {EventsService} from '../providers/events-service';
import {LocationsService} from '../providers/locations-service';
import {PapersService} from '../providers/papers-service';
import {PresentersService} from '../providers/presenters-service';
import {SpeakersService} from '../providers/speakers-service';
import {ChairsService} from '../providers/chairs-service';

@Component({
  selector: 'page_app',
  templateUrl: 'app.html',
  providers: [DatesService, EventsService, LocationsService, PapersService, PresentersService, SpeakersService, ChairsService]
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any;
  pages: Array<{ title: string, component: any, icon: string }>;
  dates: any;
  events: any;
  locations: any;
  papers: any;
  presenters: any;
  chairs: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public datesService: DatesService, public eventsService: EventsService, public locationsService: LocationsService, public papersService: PapersService, public presentersService: PresentersService, public speakersService: SpeakersService, public chairsService: ChairsService, public localNotifications: LocalNotifications) {
    this.initializeApp();

    this.rootPage = ProgramTab;
    this.pages = [
      {title: 'Schedule', component: ProgramTab, icon: 'calendar'},
      {title: 'Presenters', component: PresentersPage, icon: 'contacts'},
      {title: 'Invited Speakers', component: InvitedSpeakersPage, icon: 'microphone'}
    ];

    this.loadData();
    this.notifications();
  }

  getRootNav() {
    return this.nav;
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    if (page.component === ProgramTab) {
      this.nav.setRoot(ProgramTab, {
        programDates: this.dates,
        programEvents: this.events,
        programLocations: this.locations,
        programPapers: this.papers, programPresenters: this.presenters, programChairs: this.chairs
      });
    } else if (page.component === PresentersPage) {
      this.nav.setRoot(PresentersPage, {
        presentersList: this.presenters
      });
    } else {
      this.nav.setRoot(page.component);
    }
  }

  isActive(page) {
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

  loadData() {
    this.datesService.load().then(data => {
      this.dates = data;
      this.loadEvents();
    });
  }

  loadEvents() {
    this.eventsService.load().then(data => {
      this.events = data;
      this.loadLocations();
    });
  }

  loadLocations() {
    this.locationsService.load().then(data => {
      this.locations = data;
      this.loadPapers();
    });
  }

  loadPapers() {
    this.papersService.load().then(data => {
      this.papers = data;
      this.loadPresenters();
    });
  }

  loadPresenters() {
    this.presentersService.load().then(data => {
      this.presenters = data;
      this.loadChairs();
    });
  }

  loadChairs() {
    this.chairsService.load().then(data => {
      this.chairs = data;
      this.nav.setRoot(ProgramTab, {
        programDates: this.dates,
        programEvents: this.events,
        programLocations: this.locations,
        programPapers: this.papers, programPresenters: this.presenters, programChairs: this.chairs
      }, {animate: false});
    });
  }


  notifications() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Hey, la prima notifica',
      text: 'Esempio di prima notifica',
      sound: 'file://assets/sound/whistle.mp3',
      badge: 1,
      data: new Date(new Date().getTime() + 60),
      led: '0000FF',
    });
  }
}
