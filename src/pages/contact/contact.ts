import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LocalDataProvider } from '../../providers/local-data/local-data';

@Component({
  selector: 'page-contact',
  templateUrl: 'contact.html'
})
export class ContactPage {
  uid = '';

  constructor(public navCtrl: NavController, public localDataService: LocalDataProvider) {
  }

  async ionViewWillEnter() {
    this.uid = await this.localDataService.checkDeviceId();
  }

}
