import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ResultadoBusquedaPage } from '../resultado-busqueda/resultado-busqueda';
/**
 * Generated class for the RealizarReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-realizar-reserva',
  templateUrl: 'realizar-reserva.html',
})
export class RealizarReservaPage {
  today;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController) {
   this.menuCtrl.enable(true, 'myMenu');//para activar el menu desplegable en esta pagina
   this.today = new Date().toISOString();
  }
  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarReservaPage');
  }

  buscarConductores(){
    this.navCtrl.push(ResultadoBusquedaPage);
  }
}
