import {Component} from '@angular/core';
import {NavParams, NavController} from 'ionic-angular';
import {AuthorsService} from '../../providers/authors-service';
import{PresenterInfoPage} from '../presenterinfo-page/presenterinfo-page';

@Component({
  selector: 'paperinfo-page',
  templateUrl: 'paperinfo-page.html',
  providers: [AuthorsService]
})

export class PaperInfoPage {
  paper: any;
  paperAuthors: any;
  paperInfo: any;

  constructor(public navParams: NavParams, public navCtrl: NavController, public authorsService: AuthorsService) {
    this.paper = navParams.get("paperInfo");
    this.paperInfo = {pap: this.paper, papAuthors: []};
    this.loadAuthors();
  }

  loadAuthors() {
    this.authorsService.load().then(data => {
      this.paperAuthors = data;
      this.makePaperInfoObj();
    });
  }

  makePaperInfoObj() {
    let authors = [];
    for (let a of this.paperAuthors) {
      if (a.papersID.indexOf(this.paper.ID) > -1) {
        authors.push(a);
      }
    }
    this.paperInfo = {pap: this.paper, papAuthors: authors};
  }

  openPresenterInfoPage(author) {
    this.navCtrl.push(PresenterInfoPage, {presenter: author});
  }

}
