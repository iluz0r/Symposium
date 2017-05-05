import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AffiliationsService} from '../../providers/affiliations-service';
import {SubjectAreasService} from '../../providers/subject-areas-service';
import {PresenterInfoPage} from '../presenterinfo-page/presenterinfo-page';

@Component({
  selector: 'page-presenters',
  templateUrl: 'presenters-page.html',
  providers: [AffiliationsService, SubjectAreasService]
})
export class PresentersPage {
  presenters: any;
  affiliations: any;
  subjectareas: any;
  presentersArray: any;
  public defaultAvatar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public affiliationsService: AffiliationsService, public subjectAreasService: SubjectAreasService) {
    this.presenters = this.navParams.get("presentersList");
    this.presentersArray = [];
    this.defaultAvatar = "http://193.205.163.223/symposium/assets/img/pictures/default.png";
    this.loadData();
  }

  loadData() {
    this.affiliationsService.load().then(data => {
        this.affiliations = data;
        this.loadSubjectAreas();
      }
    )
  }

  loadSubjectAreas() {
    this.subjectAreasService.load().then(data => {
      this.subjectareas = data;
      this.makePresentersArray();
    })
  }

  makePresentersArray() {
    let affiliationsArr, subjAreasArr;

    for (let p of this.presenters) {
      affiliationsArr = [];
      subjAreasArr = [];
      for (let aff of this.affiliations) {
        if (p.affiliationsID.indexOf(aff.ID) > -1) {
          affiliationsArr.push(aff);
        }
      }
      for (let subjArea of this.subjectareas) {
        if (p.subjectAreasID.indexOf(subjArea.ID) > -1) {
          subjAreasArr.push(subjArea);
        }
      }
      this.presentersArray.push({pres: p, subjAreas: subjAreasArr, affs: affiliationsArr});
    }
  }

  openPresenterInfoPage(pres) {
    this.navCtrl.push(PresenterInfoPage, {presenter: pres});
  }

}
