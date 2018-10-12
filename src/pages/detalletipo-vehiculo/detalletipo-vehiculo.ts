import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
/**
 * Generated class for the DetalletipoVehiculoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalletipo-vehiculo',
  templateUrl: 'detalletipo-vehiculo.html',
})
export class DetalletipoVehiculoPage {

  TipoVehiculo:any = {id:null, nombre:null, descripcion:null};
  id=null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public afDB: AngularFireDatabase,
              public fireAuth:AngularFireAuth) {
                
                this.id = navParams.get('id');/*con navparams tomo el valor que pase en el metodo gotodetail tomando el id que pasa el metodo */
    /*paso el id que tome para q el metodo use dicho id */
    if (this.id != 0) {
          this.getTipoVehiculo(this.id)
            .valueChanges().subscribe( TipoVehiculoGuardado => {
              console.log(TipoVehiculoGuardado)
              this.TipoVehiculo = TipoVehiculoGuardado;
            })
    }
  
    }

  public getTipoVehiculo(id){
      return this.afDB.object('TipoVehiculo/'+id);
  }  

  public editarTipoVehiculo(TipoVehiculo){
      this.afDB.database.ref('TipoVehiculo/'+TipoVehiculo.id).set(TipoVehiculo);
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalletipoVehiculoPage');
  }

  public agregarTipoVehiculo(){
    if(this.id != 0){
      this.editarTipoVehiculo(this.TipoVehiculo);
      alert('Tipo de Vehiculo con exito');
    }else{
    this.TipoVehiculo.id = Date.now();
    this.afDB.database.ref('TipoVehiculo/'+this.TipoVehiculo.id).set(this.TipoVehiculo);
    alert('Tipo de Vehiculo creado con exito');
 }
 this.navCtrl.pop();
}

public borrarTipoVehiculo(){
  this.borrarVehiculo(this.TipoVehiculo);
  alert('La opción '+ this.TipoVehiculo.nombre +' fue eliminada con exito');
  this.navCtrl.pop();
}

public borrarVehiculo(TipoVehiculo){
     this.afDB.database.ref('TipoVehiculo/'+this.TipoVehiculo.id).remove();
}


}
