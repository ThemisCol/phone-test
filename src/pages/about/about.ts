import { Component } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { LocalDataProvider } from '../../providers/local-data/local-data';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {
  logs = [];
  constructor(public navCtrl: NavController, private localDataService: LocalDataProvider, public alertCtrl: AlertController) {
  }

  async ionViewWillEnter() {
    this.logs = await this.localDataService.loadData();
    console.log(this.logs);
  }

  removeData() {
    this.localDataService.removeData().then((response) => {
      if (response) {
        this.logs = [];
        this.showAlert('Eliminado', 'El almacenamineto local se ha eliminado satisfactoriamente');
      } else {
        this.showAlert('Error', 'Se produjo un error al momento de eliminar el almacenamineto local');
      }
    });
  }

  seeData(item) {
    const valueDecrypted = this.localDataService.decrypt(item.value);
    this.showAlert('Desencriptado', `Para la llave: "${item.key}", el valor es: "${valueDecrypted}"`);
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
