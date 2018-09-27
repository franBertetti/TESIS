import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';

/**
 * Generated class for the CodigoPasswordPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-codigo-password',
  templateUrl: 'codigo-password.html',
})
export class CodigoPasswordPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad CodigoPasswordPage');
  }

  iraPerfilCliente(){
    this.navCtrl.setRoot('PerfilClientePage');
  }

}
