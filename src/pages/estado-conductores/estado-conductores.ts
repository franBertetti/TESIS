import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetalleEstadoConductoresPage } from '../detalle-estado-conductores/detalle-estado-conductores';

/**
 * Generated class for the EstadoConductoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-estado-conductores',
  templateUrl: 'estado-conductores.html',
})
export class EstadoConductoresPage {

  estadoConductores = [];


  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB: AngularFireDatabase) {
    this.getEstadoConductor()
      .valueChanges().subscribe(EstadosGuardados => {
        console.log(EstadosGuardados)
        this.estadoConductores = EstadosGuardados;
      });
  }

  public getEstadoConductor(){
    return this.afDB.list('estadoConductor/');
}

irADetalleEstadoConductores(id){
  this.navCtrl.push(DetalleEstadoConductoresPage, {id:id});
}

crearEstadoConductor(){
  /*si nos  llega un cero quiere decir q se trata de una nueva nota*/
  this.navCtrl.push(DetalleEstadoConductoresPage, {id:0});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad EstadoConductoresPage');
  }

}
