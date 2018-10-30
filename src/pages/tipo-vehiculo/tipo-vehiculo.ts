import { Component, NgModule, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetalletipoVehiculoPage } from '../detalletipo-vehiculo/detalletipo-vehiculo';


/**
 * Generated class for the TipoVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tipo-vehiculo',
  templateUrl: 'tipo-vehiculo.html',
})
export class TipoVehiculoPage {
  
  TipoVehiculos = [];
    
  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {
      this.getTipoVehiculo()
      .valueChanges().subscribe(TipoVehiculoGuardados => {
        console.log(TipoVehiculoGuardados)
        this.TipoVehiculos = TipoVehiculoGuardados;
  });
  }

  public getTipoVehiculo(){
     return this.afDB.list('TipoVehiculo/');
 }

 irADetalleTipoVehiculo(id){
  this.navCtrl.push(DetalletipoVehiculoPage, {id:id});
}

crearTipoVehiculo(){
  /*si nos  llega un cero quiere decir q se trata de una nueva nota*/
  this.navCtrl.push(DetalletipoVehiculoPage, {id:0});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoVehiculoPage');
  }

}
