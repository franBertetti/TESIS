import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PenalizacionPage } from '../penalizacion/penalizacion';
import { InicioViajePage } from '../inicio-viaje/inicio-viaje';

/**
 * Generated class for the ViajeSeleccionadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viaje-seleccionado',
  templateUrl: 'viaje-seleccionado.html',
})
export class ViajeSeleccionadoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ViajeSeleccionadoPage');
  }

  iraPenalizacion(){
    this.navCtrl.push(PenalizacionPage);
  }

  iraInicioViaje(){
    this.navCtrl.push(InicioViajePage);
  }
}
