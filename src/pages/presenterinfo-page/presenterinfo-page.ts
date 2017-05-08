import {Component} from '@angular/core';
import {NavParams} from 'ionic-angular';
import {AffiliationsService} from '../../providers/affiliations-service';
import {SubjectAreasService} from '../../providers/subject-areas-service';
import * as Confs from '../../app/app.conf';

@Component({
  selector: 'presenterinfo-page',
  templateUrl: 'presenterinfo-page.html',
  providers: [AffiliationsService, SubjectAreasService]
})

export class PresenterInfoPage {
  presenter: any;
  affiliations: any;
  subjectareas: any;
  presenterInfo: any;
  public defaultAvatar: any;

  constructor(public navParams: NavParams, public affiliationsService: AffiliationsService, public subjectAreasService: SubjectAreasService) {
    this.presenter = navParams.get("presenter");
    this.defaultAvatar = Confs.infos.defaultAvatar;
    this.presenterInfo = {pres: this.presenter, subjAreas: [], affs: []};
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
      this.makePresenterInfoObj();
    })
  }

  makePresenterInfoObj() {
    let affiliationsArr, subjAreasArr;
    affiliationsArr = [];
    subjAreasArr = [];
    for (let aff of this.affiliations) {
      if (this.presenter.affiliationsID.indexOf(aff.ID) > -1) {
        affiliationsArr.push(aff);
      }
    }
    for (let subjArea of this.subjectareas) {
      if (this.presenter.subjectAreasID.indexOf(subjArea.ID) > -1) {
        subjAreasArr.push(subjArea);
      }
    }
    this.presenterInfo = {pres: this.presenter, subjAreas: subjAreasArr, affs: affiliationsArr};
  }

}
