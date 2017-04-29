import {Component, ViewChild} from '@angular/core';
import {Nav, Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {ProgramTab} from '../pages/programtab/programtab';
import {PresentersPage} from '../pages/presenters/presenters';
import {DaysService} from '../providers/days-service';
import {EventsService} from '../providers/events-service';
import {SpeakersService} from '../providers/speakers-service';
import {PresentersService} from '../providers/presenters-service';

@Component({
  templateUrl: 'app.html',
  providers: [DaysService, EventsService]
})

export class MyApp {
  @ViewChild(Nav) nav: Nav;
  rootPage: any = ProgramTab;
  pages: Array<{ title: string, component: any, icon: string }>;
  days: any;
  events: any;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen, public daysService: DaysService, public eventsService: EventsService) {
    this.initializeApp();
    this.pages = [
      {title: 'Program', component: ProgramTab, icon: 'calendar'},
      {title: 'Presenters', component: PresentersPage, icon: 'contacts'}
    ];

    this.loadDays();
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
    this.nav.setRoot(page.component);
    if (page.component === ProgramTab) {
      this.nav.push(ProgramTab, this.days);
    }
  }

  isActive(page) {
    if (this.nav.getActive() && this.nav.getActive().component === page.component) {
      return 'primary';
    }
    return;
  }

  loadDays() {
    this.daysService.load().then(data => {
      this.days = data;
      this.nav.push(ProgramTab, this.days);
    });
  }

  loadEvents(){
    this.eventsService.load().then(data => {
      this.events = data;
      this.nav.push(ProgramTab, this.events);
    });
  }
}
