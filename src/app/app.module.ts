import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {ProgramTab} from '../pages/programtab/programtab';
import {ProgramPage} from '../pages/program-page/program-page';
import {PaperInfoPage} from '../pages/paperinfo-page/paperinfo-page';
import {PresentersPage} from '../pages/presenters-page/presenters-page';
import {PresenterInfoPage} from '../pages/presenterinfo-page/presenterinfo-page';
import {PopoverSortPage} from '../pages/popoversort-page/popoversort-page';
import {InvitedSpeakersPage} from "../pages/invitedspeakers-page/invitedspeakers-page";
import {VenuePage} from '../pages/venue-page/venue-page';
import {AboutPage} from '../pages/about-page/about-page';

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {LocalNotifications} from '@ionic-native/local-notifications';
import {Network} from "@ionic-native/network";
import {Toast} from '@ionic-native/toast';

@NgModule({
  declarations: [
    MyApp,
    ProgramTab,
    ProgramPage,
    PaperInfoPage,
    PresentersPage,
    PresenterInfoPage,
    InvitedSpeakersPage,
    PopoverSortPage,
    VenuePage,
    AboutPage
  ],
  imports: [
    BrowserModule,
    HttpModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProgramTab,
    ProgramPage,
    PaperInfoPage,
    PresentersPage,
    PresenterInfoPage,
    InvitedSpeakersPage,
    PopoverSortPage,
    VenuePage,
    AboutPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    LocalNotifications,
    Network,
    Toast,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})

export class AppModule {
}
