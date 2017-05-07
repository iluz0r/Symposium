import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import * as Confs from '../app/app.conf';
import 'rxjs/add/operator/map';

/*
 Generated class for the DatesService provider.

 See https://angular.io/docs/ts/latest/guide/dependency-injection.html
 for more info on providers and Angular 2 DI.
 */
@Injectable()
export class DatesService {

  result: any;

  constructor(public http: Http) {
  }

  load() {
    if (this.result) {
      return Promise.resolve(this.result);
    }

    return new Promise(resolve => {
      this.http.get(Confs.infos.serverIP + '/Symposium/resources/dates')
        .map(res => res.json())
        .subscribe(data => {
          this.result = data;
          resolve(this.result);
        });
    });
  }

}
