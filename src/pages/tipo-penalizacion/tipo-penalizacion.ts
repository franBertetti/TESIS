import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { DetalleTipoPenalizacionPage } from '../detalle-tipo-penalizacion/detalle-tipo-penalizacion';
import { AngularFireDatabase } from 'angularfire2/database';

/**
 * Generated class for the TipoPenalizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-tipo-penalizacion',
  templateUrl: 'tipo-penalizacion.html',
})
export class TipoPenalizacionPage {

  tipoPenalizaciones:any = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public afDB: AngularFireDatabase) {

    this.getTipoPenalizacion()
    .valueChanges().subscribe(penalizacionesGuardadas => {
      console.log(penalizacionesGuardadas)
      this.tipoPenalizaciones = penalizacionesGuardadas;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TipoPenalizacionPage');
  }

  public getTipoPenalizacion(){
    return this.afDB.list('tipoPenalizacion/');
}

  crearTipoPenalizacion(){
    this.navCtrl.push(DetalleTipoPenalizacionPage, {id:0});
  }

  irADetalletipoPenalizacion(id){
    this.navCtrl.push(DetalleTipoPenalizacionPage, {id:id});
  }
}
