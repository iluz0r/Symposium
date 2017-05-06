import {Component} from '@angular/core';
import {NavParams, ViewController, NavController} from 'ionic-angular';

@Component({
  templateUrl: 'popoversort-page.html',
  selector: 'popoversort-page'
})

export class PopoverSortPage {

  selectedOption: any;
  sortCallback: any;

  constructor(public viewCtrl: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.sortCallback = navParams.get("sortPresentersBy");
    this.selectedOption = navParams.get("opt");
  }

  sortPresenters() {
    this.sortCallback(this.selectedOption);
    this.viewCtrl.dismiss();
  }
}
