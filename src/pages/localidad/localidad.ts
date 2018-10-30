import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { DetalleLocalidadPage } from '../detalle-localidad/detalle-localidad';
/**
 * Generated class for the LocalidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-localidad',
  templateUrl: 'localidad.html',
})
export class LocalidadPage {

  Localidades = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,public afDB: AngularFireDatabase) {
    this.getLocalidad()
      .valueChanges().subscribe(localidadesGuardadas => {
        console.log(localidadesGuardadas)
        this.Localidades = localidadesGuardadas;
      });
  }

  public getLocalidad(){
    return this.afDB.list('Localidad/');
}

irADetalleLocalidad(id){
  this.navCtrl.push(DetalleLocalidadPage, {id:id});
}

crearLocalidad(){
  /*si nos  llega un cero quiere decir q se trata de una nueva nota*/
  this.navCtrl.push(DetalleLocalidadPage, {id:0});
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad LocalidadPage');
  }

}
