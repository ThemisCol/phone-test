
import { Storage } from '@ionic/storage';
import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { UniqueDeviceID } from '@ionic-native/unique-device-id';
import { Platform } from 'ionic-angular';

/*
  Generated class for the LocalDataProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LocalDataProvider {
  dataList = [];
  key = '6Le0sdfsafAAANokdEEial';
  iv = 'mHGFxEasffZLbienLyANoi';
  uid = '';
  isDevice = false;

  constructor(
    public storage: Storage, 
    private uniqueDeviceID: UniqueDeviceID, 
    public platform: Platform) {
    this.initialize();
  }

  async initialize() {
    await this.getDeviceId();
    this.loadData();
  }

  async saveData(data) {
    this.checkDeviceId();
    const dataJson = {key: data.key, value: this.encrypt(data.value)};
    this.dataList.unshift(dataJson);
    await this.storage.set('data', this.dataList);
  }

  async loadData() {
    this.checkDeviceId();
    const data = await this.storage.get('data');
    this.dataList = data || [];
    return this.dataList;
  }

  async removeData() {
    await this.storage.remove('data');
    return true;
  }

  public encrypt(text: string) {
    return CryptoJS.AES.encrypt(text, this.getCustomKey(), { iv: this.iv }).toString();
  }

  public decrypt(text: string) {
     return CryptoJS.AES.decrypt(text, this.getCustomKey(), { iv: this.iv }).toString(CryptoJS.enc.Utf8);
  }

  public async getDeviceId() {
    if (!this.platform.is('core') && !this.platform.is('mobileweb')) {
      this.isDevice = true;
      try{
        this.uid = await this.uniqueDeviceID.get();
        console.log('then -> ', this.uid);
      } catch(e){
        this.uid = '';
        console.log('error -> ', this.uid);
      }
    } else {
      this.uid = '';
    }
    return this.uid;
  }

  public async checkDeviceId(){
    if (this.isDevice && this.uid === '') {
      return await this.getDeviceId();
    } else {
      return this.uid;
    }
  }

  getCustomKey() {
    const finalUid = this.uid.split('-').join('');
    return `${this.key}${finalUid}`;
  }



}
