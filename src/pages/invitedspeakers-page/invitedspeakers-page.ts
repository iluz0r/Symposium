import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {SpeakersService} from '../../providers/speakers-service';
import {AffiliationsService} from '../../providers/affiliations-service';
import {SubjectAreasService} from '../../providers/subject-areas-service';
import {PresenterInfoPage} from '../presenterinfo-page/presenterinfo-page';

@Component({
  selector: 'invitedspeakers-page',
  templateUrl: 'invitedspeakers-page.html',
  providers: [SpeakersService, AffiliationsService, SubjectAreasService]
})
export class InvitedSpeakersPage {
  invitedSpeakers: any;
  affiliations: any;
  subjectareas: any;
  invitedSpeakersArray: any;
  public defaultAvatar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public invitedSpeakersService: SpeakersService, public affiliationsService: AffiliationsService, public subjectAreasService: SubjectAreasService) {
    this.invitedSpeakersArray = [];
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
      this.loadInvitedSpeakers();
    })
  }

  loadInvitedSpeakers() {
    this.invitedSpeakersService.load().then(data => {
      this.invitedSpeakers = data;
      this.makeInvitedSpeakersArray();
    })
  }

  makeInvitedSpeakersArray() {
    let affiliationsArr, subjAreasArr;

    for (let speaker of this.invitedSpeakers) {
      affiliationsArr = [];
      subjAreasArr = [];
      for (let aff of this.affiliations) {
        if (speaker.affiliationsID.indexOf(aff.ID) > -1) {
          affiliationsArr.push(aff);
        }
      }
      for (let subjArea of this.subjectareas) {
        if (speaker.subjectAreasID.indexOf(subjArea.ID) > -1) {
          subjAreasArr.push(subjArea);
        }
      }
      this.invitedSpeakersArray.push({
        pres: speaker,
        subjAreas: subjAreasArr,
        affs: affiliationsArr,
      });
    }

  }

  openPresenterInfoPage(speak) {
    this.navCtrl.push(PresenterInfoPage, {presenter: speak});
  }

}
