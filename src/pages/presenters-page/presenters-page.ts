import {Component} from '@angular/core';
import {NavParams, NavController, PopoverController} from 'ionic-angular';
import {AffiliationsService} from '../../providers/affiliations-service';
import {SubjectAreasService} from '../../providers/subject-areas-service';
import {PresenterInfoPage} from '../presenterinfo-page/presenterinfo-page';
import {PopoverSortPage} from '../popoversort-page/popoversort-page';

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
  queryText: any;
  prevQueryLength: any;
  popover: any;
  public defaultAvatar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public affiliationsService: AffiliationsService, public subjectAreasService: SubjectAreasService, public popCtrl: PopoverController) {
    this.presenters = this.navParams.get("presentersList");
    this.presentersArray = [];
    this.defaultAvatar = "http://193.205.163.223/symposium/assets/img/pictures/default.png";
    this.popover = popCtrl.create(PopoverSortPage);
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
      this.presentersArray.push({
        pres: p,
        subjAreas: subjAreasArr,
        affs: affiliationsArr,
        pHidden: false
      });
    }
  }

  openPresenterInfoPage(pres) {
    this.navCtrl.push(PresenterInfoPage, {presenter: pres});
  }

  updatePresentersList() {
    this.queryText = this.queryText.toLowerCase().replace(/,|\.|-/g, '');
    let queryWords = this.queryText.split(' ').filter(w => !!w.trim().length);

    if (this.queryText.length == 0 || this.queryText.length < this.prevQueryLength) {
      for (let p of this.presentersArray) {
        p.pHidden = false;
      }
    }
    this.prevQueryLength = this.queryText.length;

    for (let w of queryWords) {
      for (let p of this.presentersArray) {
        if (!(p.pres.firstName.toLowerCase().startsWith(w) || p.pres.lastName.toLowerCase().startsWith(w) || this.searchSubjAreaByWord(w, p) || this.searchAffByWord(w, p)) && !p.pHidden) {
          p.pHidden = true;
        }
      }
    }
  }

  searchSubjAreaByWord(w, p) {
    for (let s of p.subjAreas) {
      if (s.name.toLowerCase().indexOf(w) > -1) {
        return true;
      }
    }
    return false;
  }

  searchAffByWord(w, p) {
    for (let s of p.affs) {
      if (s.name.toLowerCase().indexOf(w) > -1) {
        return true;
      }
    }
    return false;
  }

  ionViewDidLoad() {
    if (this.presentersArray.length != 0) {
      this.updatePresentersList();
    }
  }

  openPopover(event: Event) {
    /* this.navParams.present(this.popover, {
     ev: event
     });
     this.popover.onDismiss(data => {
     console.log("popover dismissed");
     console.log("Selected Item is " + data);
     });
     }

     this.popover.present({ev: event});
     */
  }
}
