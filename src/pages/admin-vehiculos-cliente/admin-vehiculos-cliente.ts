import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleVehiculosClientePage } from '../detalle-vehiculos-cliente/detalle-vehiculos-cliente';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the AdminVehiculosClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-admin-vehiculos-cliente',
  templateUrl: 'admin-vehiculos-cliente.html',
})
export class AdminVehiculosClientePage {

  vehiculos = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {
    this.getVehiculos()
      .valueChanges().subscribe(VehiculosGuardadas => {
        this.vehiculos = VehiculosGuardadas;
      });
  }

  public getVehiculos(){
    return this.afDB.list('vehiculoCliente/');
}

irADetalleVehiculosCliente(id){
  this.navCtrl.push(DetalleVehiculosClientePage, {id:id});
}

crearVehiculoCliente(){
  /*si nos  llega un cero quiere decir q se trata de una nueva nota*/
  this.navCtrl.push(DetalleVehiculosClientePage, {id:0});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminVehiculosClientePage');
  }

}
