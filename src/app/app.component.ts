import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
//import {LocalNotifications} from '@ionic-native/local-notifications';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ProgramTab} from '../pages/programtab/programtab';
import {PresentersPage} from '../pages/presenters-page/presenters-page';
import {DatesService} from '../providers/dates-service';
import {EventsService} from '../providers/events-service';
import {LocationsService} from '../providers/locations-service';
import {PapersService} from '../providers/papers-service';
import {PresentersService} from '../providers/presenters-service';
import {SpeakersService} from '../providers/speakers-service';

@Component({
  selector: 'page_app',
  templateUrl: 'app.html',
  providers: [DatesService, EventsService, LocationsService, PapersService, PresentersService]
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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public datesService: DatesService, public eventsService: EventsService, public locationsService: LocationsService, public papersService: PapersService, public presentersService: PresentersService) {
    this.initializeApp();

    this.rootPage = ProgramTab;
    this.pages = [
      {title: 'Schedule', component: ProgramTab, icon: 'calendar'},
      {title: 'Presenters', component: PresentersPage, icon: 'contacts'}
    ];

    this.loadData();
    //this.notifications();
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
        programPapers: this.papers, programPresenters: this.presenters
      });
    }
    else if (page.component === PresentersPage) {
      this.nav.setRoot(PresentersPage, {
        presentersList: this.presenters
      });
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
      }
    );
  }

  loadPresenters() {
    this.presentersService.load().then(data => {
      this.presenters = data;
      this.nav.push(ProgramTab, {
        programDates: this.dates,
        programEvents: this.events,
        programLocations: this.locations,
        programPapers: this.papers, programPresenters: this.presenters
      }, {animate: false});
    });
  }


  /*notifications() {
    this.localNotifications.schedule({
      id: 1,
      title: 'Hey, la prima notifica',
      text: 'Esempio di prima notifica',
      sound: 'file://res/sounds/whistle.mp3',
      badge: 1,
      data: new Date(new Date().getTime() + 3600),
      led: '0000FF',
    });
  }*/
}
