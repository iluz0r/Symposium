import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the LocationsService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class LocationsService {

  result: any;

  constructor(public http: Http) {
  }

  load() {
    if (this.result) {
      return Promise.resolve(this.result);
    }

    return new Promise(resolve => {
      this.http.get('http://193.205.163.223:8080/Symposium/resources/locations')
        .map(res => res.json())
        .subscribe(data => {
          this.result = data;
          console.log(this.result);
          resolve(this.result);
        });
    });
  }

}
