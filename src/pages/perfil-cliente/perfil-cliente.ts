import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RegistrarConductorPage } from '../registrar-conductor/registrar-conductor';
import { HistoricoViajesPage } from '../historico-viajes/historico-viajes';
import { DatosPersonalesUsuarioPage } from '../datos-personales-usuario/datos-personales-usuario';
import { PenalizacionesPage } from '../penalizaciones/penalizaciones';
import { ViajeSeleccionadoPage } from '../viaje-seleccionado/viaje-seleccionado';
import { RealizarReservaPage } from '../realizar-reserva/realizar-reserva';

/**
 * Generated class for the PerfilClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-cliente',
  templateUrl: 'perfil-cliente.html',
})
export class PerfilClientePage {
  usuarios = [];
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilClientePage');
  }

  iraRegistrarConductor(){
    this.navCtrl.push(RegistrarConductorPage);
  }

  iraHistoricoViajes(){
    this.navCtrl.push(HistoricoViajesPage);
  }

  iraDatosPersonales(){
    this.navCtrl.push(DatosPersonalesUsuarioPage);
  }

  iraPenalizaciones(){
    this.navCtrl.push(PenalizacionesPage);
  }

  iraViajeSeleccionado(){
    this.navCtrl.push(ViajeSeleccionadoPage);
  }

  iraRegistrarReserva(){
    this.navCtrl.push(RealizarReservaPage);
  }
}
