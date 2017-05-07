import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import * as Confs from '../../app/app.conf';

@Component({
  selector: 'page-presenterinfo',
  templateUrl: 'presenterinfo-page.html',
})

export class PresenterInfoPage {
  presenterInfo: any;
  public defaultAvatar: any;

  constructor(public navParams: NavParams) {
    this.presenterInfo = navParams.get("presenter");
    this.defaultAvatar = Confs.infos.defaultAvatar;
  }

}
