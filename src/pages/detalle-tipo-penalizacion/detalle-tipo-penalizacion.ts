import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the DetalleTipoPenalizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-tipo-penalizacion',
  templateUrl: 'detalle-tipo-penalizacion.html',
})
export class DetalleTipoPenalizacionPage {

  TipoPenalizacion:any = {id:null, nombre:null, descripcion:null, monto:null};
  id=null;

    constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth:AngularFireAuth) {
  
      this.id = navParams.get('id');/*con navparams tomo el valor que pase en el metodo gotodetail tomando el id que pasa el metodo */
      /*paso el id que tome para q el metodo use dicho id */
      if (this.id != 0) {
            this.getTipoPenalizacion(this.id)
              .valueChanges().subscribe( PenalizacionGuardada => {
                console.log(PenalizacionGuardada)
                this.TipoPenalizacion = PenalizacionGuardada;
              })
      }

    }

    public getTipoPenalizacion(id){
      return this.afDB.object('tipoPenalizacion/'+id);
  }  

  public editarTipoPenalizacion(TipoPenalizacion){
    this.afDB.database.ref('tipoPenalizacion/'+TipoPenalizacion.id).set(TipoPenalizacion);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleTipoPenalizacionPage');
  }

  agregarTipoPenalizacion(){
    if(this.id != 0){
      this.editarTipoPenalizacion(this.TipoPenalizacion);
      alert('Tipo de Penalización editada con exito');
    }else{
    this.TipoPenalizacion.id = Date.now();
    this.afDB.database.ref('tipoPenalizacion/'+this.TipoPenalizacion.id).set(this.TipoPenalizacion);
    alert('Tipo de Penalización creada con exito');
 }
 this.navCtrl.pop();
  }
  
  borrarTipoPenalizacion(){
    this.borrar(this.TipoPenalizacion);
    alert('La opción '+ this.TipoPenalizacion.nombre +' fue eliminada con exito');
    this.navCtrl.pop();
  }

  public borrar(tipoPenalizacion){
    this.afDB.database.ref('tipoPenalizacion/'+tipoPenalizacion.id).remove();
}

}
