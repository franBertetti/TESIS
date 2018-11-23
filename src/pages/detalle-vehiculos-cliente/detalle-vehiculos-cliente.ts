import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DetalleVehiculosClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-vehiculos-cliente',
  templateUrl: 'detalle-vehiculos-cliente.html',
})
export class DetalleVehiculosClientePage {

  vehiculoCliente: any = { id: null, nombre: null, descripcion: null };
  id = null;
  TipoVehiculos = [];

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth) {

    this.id = navParams.get('id');/*con navparams tomo el valor que pase en el metodo gotodetail tomando el id que pasa el metodo */
    /*paso el id que tome para q el metodo use dicho id */
    if (this.id != 0) {
      this.getVehiculoCliente(this.id)
        .valueChanges().subscribe(vehiculoClienteGuardadas => {
          console.log(vehiculoClienteGuardadas)
          this.vehiculoCliente = vehiculoClienteGuardadas;
        })
    }

    this.getTipoVehiculo()
      .valueChanges().subscribe(TipoVehiculoGuardados => {
        console.log(TipoVehiculoGuardados)
        this.TipoVehiculos = TipoVehiculoGuardados;
      });

  }

  public getTipoVehiculo(){
    return this.afDB.list('TipoVehiculo/');
 }

  public getVehiculoCliente(id) {
    return this.afDB.object('vehiculoCliente/' + id);
  }

  public editarVehiculoCliente(vehiculoCliente) {
    this.afDB.database.ref('vehiculoCliente/' + vehiculoCliente.id).set(vehiculoCliente);
  }

  public agregarVehiculoCliente() {
    if (this.id != 0) {
      this.editarVehiculoCliente(this.vehiculoCliente);
      alert('Tipo de Vehiculo con exito');
    } else {
      this.vehiculoCliente.id = Date.now();
      this.afDB.database.ref('vehiculoCliente/' + this.vehiculoCliente.id).set(this.vehiculoCliente);
      alert('Vehiculo Cliente creado con exito');
    }
    this.navCtrl.pop();
  }

  public borrarVehiculoCliente() {
    this.borrar(this.vehiculoCliente);
    alert('La opción ' + this.vehiculoCliente.nombre + ' fue eliminada con exito');
    this.navCtrl.pop();
  }

  public borrar(vehiculoCliente) {
    this.afDB.database.ref('vehiculoCliente/' + this.vehiculoCliente.id).remove();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleVehiculosClientePage');
  }

}
