import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatosReservaPage } from '../datos-reserva/datos-reserva';

/**
 * Generated class for the ResultadoBusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado-busqueda',
  templateUrl: 'resultado-busqueda.html',
})
export class ResultadoBusquedaPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoBusquedaPage');
  }

  confirmarConductor(){
    let alert = this.alertCtrl.create({
      title: 'Confirmar conductor',
      message: 'Esta seguro que desea confirmar la reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Si clicked');
            this.navCtrl.push(DatosReservaPage);
          }
        }
      ]
    });
    alert.present();
  }
  
}
