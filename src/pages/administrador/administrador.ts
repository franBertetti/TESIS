import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TipoVehiculoPage } from '../tipo-vehiculo/tipo-vehiculo';    
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';
import { LocalidadPage } from '../localidad/localidad';
import { AdminConductoresPage } from '../admin-conductores/admin-conductores';
import { EstadoConductoresPage } from '../estado-conductores/estado-conductores';
import { AdminVehiculosClientePage } from '../admin-vehiculos-cliente/admin-vehiculos-cliente';
import { TipoPenalizacionPage } from '../tipo-penalizacion/tipo-penalizacion';


/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public fireAuth:AngularFireAuth) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministradorPage');
  }

  irATipoVehiculo(){
    this.navCtrl.push(TipoVehiculoPage);
  }

  irALocalidad(){
    this.navCtrl.push(LocalidadPage);
  }

  irAAdminConductores(){
    this.navCtrl.push(AdminConductoresPage);
  }

  irAEstadoConductores(){
    this.navCtrl.push(EstadoConductoresPage);
  }

  irAAdminVehiculosCliente(){
    this.navCtrl.push(AdminVehiculosClientePage);
  }

  irATipoPenalizaciones(){
    this.navCtrl.push(TipoPenalizacionPage);
  }

  cerrarSesion(){
      this.fireAuth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
  }
}
