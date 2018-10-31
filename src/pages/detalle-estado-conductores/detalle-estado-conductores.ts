import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the DetalleEstadoConductoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-estado-conductores',
  templateUrl: 'detalle-estado-conductores.html',
})
export class DetalleEstadoConductoresPage {

  estadoConductor:any = {id:null, nombre:null, descripcion:null};
  id=null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth:AngularFireAuth) {
  
      this.id = navParams.get('id');/*con navparams tomo el valor que pase en el metodo gotodetail tomando el id que pasa el metodo */
      /*paso el id que tome para q el metodo use dicho id */
      if (this.id != 0) {
            this.getEstadoConductor(this.id)
              .valueChanges().subscribe( EstadoConductorGuardadas => {
                console.log(EstadoConductorGuardadas)
                this.estadoConductor = EstadoConductorGuardadas;
              })
      }

    }

  
    public getEstadoConductor(id){
      return this.afDB.object('estadoConductor/'+id);
  }  

  public editarEstadoConductor(estadoConductor){
      this.afDB.database.ref('estadoConductor/'+this.estadoConductor.id).set(estadoConductor);
    }

    public agregarEstadoConductor(){
      if(this.id != 0){
        this.editarEstadoConductor(this.estadoConductor);
        alert('Estado de conductor con exito');
      }else{
      this.estadoConductor.id = Date.now();
      this.afDB.database.ref('estadoConductor/'+this.estadoConductor.id).set(this.estadoConductor);
      alert('Estado de Conductor creada con exito');
   }
   this.navCtrl.pop();
  }
  
  public borrarEstadoConductor(){
    this.borrar(this.estadoConductor);
    alert('La opción '+ this.estadoConductor.nombre +' fue eliminada con exito');
    this.navCtrl.pop();
  }
  
  public borrar(estadoConductor){
       this.afDB.database.ref('estadoConductor/'+estadoConductor.id).remove();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleEstadoConductoresPage');
  }

}
