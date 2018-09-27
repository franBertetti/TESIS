import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FinalViajePage } from '../final-viaje/final-viaje';

/**
 * Generated class for the InicioViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-viaje',
  templateUrl: 'inicio-viaje.html',
})
export class InicioViajePage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InicioViajePage');
  }

  iraFinalViaje(){
    this.navCtrl.push(FinalViajePage);
  }
}
