import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {ProgramPage} from '../program/program';
import {DaysService} from '../../providers/days-service';

@Component({
  selector: 'page-programtab',
  templateUrl: 'programtab.html',
  providers: [DaysService]
})
export class ProgramTab {

  rootPage = ProgramPage;
  days: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public daysService: DaysService) {
    this.loadDays();
  }

  loadDays() {
    this.daysService.load().then(data => {
      this.days = data;
    });
  }

  ionViewDidLoad() {
  }

}
