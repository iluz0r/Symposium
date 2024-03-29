import {Component} from '@angular/core';
import {NavParams, NavController, PopoverController} from 'ionic-angular';
import {PresenterInfoPage} from '../presenterinfo-page/presenterinfo-page';
import {PopoverSortPage} from '../popoversort-page/popoversort-page';
import {AffiliationsService} from '../../providers/affiliations-service';
import {SubjectAreasService} from '../../providers/subject-areas-service';
import * as Confs from '../../app/app.conf';

@Component({
  selector: 'presenters-page',
  templateUrl: 'presenters-page.html',
  providers: [AffiliationsService, SubjectAreasService]
})
export class PresentersPage {
  presenters: any;
  presentersArray: any;
  queryText: any;
  prevQueryLength: any;
  sortedBy: any;
  affiliations: any;
  subjectareas: any;
  public defaultAvatar: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public popCtrl: PopoverController, public affiliationsService: AffiliationsService, public subjectAreasService: SubjectAreasService) {
    this.presenters = this.navParams.get("presentersList");
    this.presentersArray = [];
    this.defaultAvatar = Confs.infos.defaultAvatar;
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
        if (!(p.pres.firstName.toLowerCase().indexOf(w) > -1 || p.pres.lastName.toLowerCase().indexOf(w) > -1 || this.searchSubjAreaByWord(w, p) || this.searchAffByWord(w, p)) && !p.pHidden) {
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

  openPopover(event: Event) {
    let popover = this.popCtrl.create(PopoverSortPage, {
      sortPresentersBy: function (option) {
        if (option == 'hindex') {
          this.presentersArray.sort(function (p1, p2) {
            return (p1.pres.hindex < p2.pres.hindex) ? 1 : ((p2.pres.hindex < p1.pres.hindex) ? -1 : 0);
          })
        } else if (option == 'lastname') {
          this.presentersArray.sort(function (p1, p2) {
            return (p1.pres.lastName > p2.pres.lastName) ? 1 : ((p2.pres.lastName > p1.pres.lastName) ? -1 : 0);
          })
        } else {
          this.presentersArray.sort(function (p1, p2) {
            return (p1.pres.firstName > p2.pres.firstName) ? 1 : ((p2.pres.firstName > p1.pres.firstName) ? -1 : 0);
          })
        }
        this.sortedBy = option;
      }.bind(this), // Importante per non perdere la visibilità di this nella callback function
      opt: this.sortedBy
    });
    popover.present({
      ev: event
    });
  }

}
