import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { AlertController } from 'ionic-angular';
import { LocalDataProvider } from '../../providers/local-data/local-data';
import { Device } from '@ionic-native/device/ngx';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  log = {
    key: '',
    value: ''
  };

  constructor(public navCtrl: NavController, 
    public alertCtrl: AlertController, 
    private _device: Device,
    private localDataService: LocalDataProvider) {
  }

  async ionViewWillEnter() {
    await this.localDataService.checkDeviceId();
  }
  async onSubmitTemplate() {
    if( this.log.key === '' || this.log.value === '') {
      this.showAlert('Error', 'Hay campos vacíos');
      this.log.key = '';
      this.log.value = '';
      return;
    }


    await this.localDataService.saveData(this.log);
    this.showAlert('Agregado', 'La clave ha sido agregada exitosamente');
    this.log.key = '';
    this.log.value = '';

  }

  showAlert(title, subTitle) {
    const alert = this.alertCtrl.create({
      title,
      subTitle,
      buttons: ['OK']
    });
    alert.present();

  }

}
