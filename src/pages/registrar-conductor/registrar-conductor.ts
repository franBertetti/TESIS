import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';

/**
 * Generated class for the RegistrarConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-conductor',
  templateUrl: 'registrar-conductor.html',
})
export class RegistrarConductorPage {

Conductor:any={};
TipoVehiculos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public afDB: AngularFireDatabase) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
    this.getTipoVehiculo()
    .valueChanges().subscribe(TipoVehiculoGuardados => {
      console.log(TipoVehiculoGuardados)
      this.TipoVehiculos = TipoVehiculoGuardados;
});
}

public getTipoVehiculo(){
   return this.afDB.list('TipoVehiculo/');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarConductorPage');
  }

  iraPerfilCliente(){
    this.navCtrl.setRoot('PerfilClientePage');
  }
}
