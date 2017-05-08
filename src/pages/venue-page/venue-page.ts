import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';

@Component({
  templateUrl: 'venue-page.html',
  selector: 'venue-page'
})
export class VenuePage {

  venues: any;

  constructor(public navParam: NavParams) {
    this.venues = this.navParam.get("venues");
  }

}
