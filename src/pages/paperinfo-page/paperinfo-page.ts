import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-paperinfo',
  templateUrl: 'paperinfo-page.html',
})

export class PaperInfoPage {
  paperInfo: any;

  constructor(public navParams: NavParams) {
    this.paperInfo = navParams.get("paperInfo");
  }

}
