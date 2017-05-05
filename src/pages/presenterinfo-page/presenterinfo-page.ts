import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  selector: 'page-presenterinfo',
  templateUrl: 'presenterinfo-page.html',
})

export class PresenterInfoPage {
  presenterInfo: any;
  public defaultAvatar: any;

  constructor(public navParams: NavParams) {
    this.presenterInfo = navParams.get("presenter");
    this.defaultAvatar = "http://193.205.163.223/symposium/assets/img/pictures/default.png";
  }

}
