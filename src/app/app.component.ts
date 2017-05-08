import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Network} from '@ionic-native/network';
import {Toast} from '@ionic-native/toast';

import {ProgramTab} from '../pages/programtab/programtab';
import {PresentersPage} from '../pages/presenters-page/presenters-page';
import {InvitedSpeakersPage} from '../pages/invitedspeakers-page/invitedspeakers-page';
import {AboutPage} from '../pages/about-page/about-page';
import {VenuePage} from '../pages/venue-page/venue-page';

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

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public datesService: DatesService, public eventsService: EventsService, public locationsService: LocationsService, public papersService: PapersService, public presentersService: PresentersService, public speakersService: SpeakersService, public chairsService: ChairsService, public localNotifications: LocalNotifications, public network: Network, public toast: Toast) {
    this.initializeApp();

    this.rootPage = ProgramTab;
    this.pages = [
      {title: 'Schedule', component: ProgramTab, icon: 'calendar'},
      {title: 'Presenters', component: PresentersPage, icon: 'contacts'},
      {title: 'Invited speakers', component: InvitedSpeakersPage, icon: 'microphone'},
      {title: 'Conference venue', component: VenuePage, icon: 'pin'},
      {title: 'About', component: AboutPage, icon: 'information-circle'}
    ];

    this.loadData();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.network.onDisconnect().subscribe(() => {
        this.toast.show('Device disconnected from the network', '5000', 'bottom').subscribe(
          toast => {
            setTimeout(() => {
              this.platform.exitApp();
            }, 5000);
          }
        );
      });
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
    } else if (page.component === VenuePage) {
      this.nav.setRoot(VenuePage, {venues: this.locations});
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
      this.setLocalNotifications();
      this.nav.setRoot(ProgramTab, {
        programDates: this.dates,
        programEvents: this.events,
        programLocations: this.locations,
        programPapers: this.papers, programPresenters: this.presenters, programChairs: this.chairs
      }, {animate: false});
    });
  }


  convertFromAMPMTo24(time) {
    let hours = Number(time.match(/^(\d+)/)[1]);
    let minutes = Number(time.match(/:(\d+)/)[1]);
    let AMPM = time.match(/\s(.*)$/)[1];
    if (AMPM == "PM" && hours < 12) hours = hours + 12;
    if (AMPM == "AM" && hours == 12) hours = hours - 12;
    let sHours = hours.toString();
    let sMinutes = minutes.toString();
    if (hours < 10) sHours = "0" + sHours;
    if (minutes < 10) sMinutes = "0" + sMinutes;
    time = sHours + ':' + sMinutes + ':' + '00';
    return time;
  }

  setLocalNotifications() {
    for (let ev of this.events) {
      if (ev.type != '2') {
        let date = ev.date;
        let startTime = ev.startTime;
        let dateString = date + ' ' + this.convertFromAMPMTo24(startTime);
        let dateMillisec = new Date(Date.parse(dateString)).getTime();
        let actualDate = new Date();

        if (actualDate.getTime() < new Date(dateMillisec - 15 * 60 * 1000).getTime()) {
          this.localNotifications.schedule({
            id: ev.ID,
            title: 'Symposium',
            text: ev.name + ' - starts at ' + new Date(dateMillisec).getHours() + ':' + new Date(dateMillisec).getMinutes(),
            badge: 1,
            at: dateMillisec - 15 * 60 * 1000,
            led: '0000FF',
          });
        }
      }
    }
  }
}
