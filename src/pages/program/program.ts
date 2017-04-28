import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

@Component({
  selector: 'page-program',
  templateUrl: 'program.html',
})
export class ProgramPage {

  constructor(public navCtrl: NavController) {
  }

}

@Component({
  template: `
    <ion-tabs tabsPlacement="top" color="primary">
      <ion-tab tabTitle="May 14" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="May 15" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="May 16" [root]="rootPage"></ion-tab>
      <ion-tab tabTitle="May 17" [root]="rootPage"></ion-tab>
    </ion-tabs>
  `
})
export class TabPage {
  rootPage = ProgramPage;
}
