import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';

/**
 * Generated class for the FinalViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final-viaje',
  templateUrl: 'final-viaje.html',
})
export class FinalViajePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalViajePage');
  }

  iraPerfilCliente(){
    this.navCtrl.setRoot('PerfilClientePage');
  }
}
