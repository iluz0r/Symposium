import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {DomSanitizer} from '@angular/platform-browser';
import {Platform} from 'ionic-angular';

@Component({
  templateUrl: 'venue-page.html',
  selector: 'venue-page'
})
export class VenuePage {

  venues: any;

  constructor(public platform: Platform, public navParam: NavParams, public sanitizer: DomSanitizer) {
    this.venues = this.navParam.get("venues");
  }

  sanitize(url: string) {
    return this.sanitizer.bypassSecurityTrustUrl(url);
  }

  createGMapsURL(v) {
    let queryParam = v.address.split(' ').join('+') + '+' + v.city.split(' ').join('+') + '+' + v.country.split(' ').join('+');
    let header;

    if(this.platform.is('ios') || this.platform.is('iphone') || this.platform.is('ipad')) {
      header = 'comgooglemaps://?q=';
    } else {
      header = 'geo://0,0?q=';
    }
    return this.sanitize(header + queryParam);
  }

}
