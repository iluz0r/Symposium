import {BrowserModule} from '@angular/platform-browser';
import {HttpModule} from '@angular/http';
import {ErrorHandler, NgModule} from '@angular/core';
import {IonicApp, IonicErrorHandler, IonicModule} from 'ionic-angular';

import {MyApp} from './app.component';
import {ProgramTab} from '../pages/programtab/programtab';
import {ProgramPage} from '../pages/program-page/program-page';
import {PresentersPage} from '../pages/presenters-page/presenters-page';
import {PresenterInfoPage} from "../pages/presenterinfo-page/presenterinfo-page";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';


@NgModule({
  declarations: [
    MyApp,
    ProgramTab,
    ProgramPage,
    PresentersPage,
    PresenterInfoPage
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
    PresentersPage,
    PresenterInfoPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {
}
