import {Component} from '@angular/core';
import {NavParams, ViewController, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'popoversort-page.html',
  selector: 'popoversort-page'
})

export class PopoverSortPage {

  callback: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.callback = navParams.get("sortPresentersBy");
  }

  sortPresenters(val: string) {
    this.callback(val);
    this.viewCtrl.dismiss();
  }
}
