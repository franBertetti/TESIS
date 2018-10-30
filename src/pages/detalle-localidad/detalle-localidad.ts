import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the DetalleLocalidadPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-localidad',
  templateUrl: 'detalle-localidad.html',
})
export class DetalleLocalidadPage {

  Localidad:any = {id:null, nombre:null, descripcion:null};
  id=null;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth:AngularFireAuth) {
  
      this.id = navParams.get('id');/*con navparams tomo el valor que pase en el metodo gotodetail tomando el id que pasa el metodo */
      /*paso el id que tome para q el metodo use dicho id */
      if (this.id != 0) {
            this.getLocalidad(this.id)
              .valueChanges().subscribe( LocalidadesGuardadas => {
                console.log(LocalidadesGuardadas)
                this.Localidad = LocalidadesGuardadas;
              })
      }

    }

    public getLocalidad(id){
      return this.afDB.object('Localidad/'+id);
  }  

  public editarLocalidad(Localidad){
      this.afDB.database.ref('Localidad/'+Localidad.id).set(Localidad);
    }

    public agregarLocalidad(){
      if(this.id != 0){
        this.editarLocalidad(this.Localidad);
        alert('Tipo de Vehiculo con exito');
      }else{
      this.Localidad.id = Date.now();
      this.afDB.database.ref('Localidad/'+this.Localidad.id).set(this.Localidad);
      alert('Localidad creada con exito');
   }
   this.navCtrl.pop();
  }
  
  public borrarLocalidad(){
    this.borrar(this.Localidad);
    alert('La opción '+ this.Localidad.nombre +' fue eliminada con exito');
    this.navCtrl.pop();
  }
  
  public borrar(Localidad){
       this.afDB.database.ref('Localidad/'+this.Localidad.id).remove();
  }





    ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleLocalidadPage');
  }

}
