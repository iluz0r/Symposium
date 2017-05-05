import {Component} from '@angular/core';
import {NavController, ViewController} from 'ionic-angular';
import {PresentersPage} from '../presenters-page/presenters-page';


@Component({
  templateUrl: 'popoversort-page.html'
})

export class PopoverSortPage {

  constructor(public navCtrl: NavController, public viewCtrl: ViewController) {
  }

  sortPresentersBy() {
    this.viewCtrl.dismiss();
  }
}
