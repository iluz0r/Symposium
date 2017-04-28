import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { ProgramPage } from '../program/program'

@Component({
  selector: 'page-programtab',
  templateUrl: 'programtab.html',
})
export class ProgramTab {

  rootPage = ProgramPage;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProgramTab');
  }

}
