  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';






/**
 * Generated class for the DatosPersonalesUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-personales-usuario',
  templateUrl: 'datos-personales-usuario.html',
})
export class DatosPersonalesUsuarioPage {
  usuario:any = {};  


  constructor(public afDB: AngularFireDatabase,
     public navCtrl: NavController,
      public navParams: NavParams,
      public fireAuth:AngularFireAuth,
       public menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPersonalesUsuarioPage');
    //this.fireAuth.user.subscribe(user=> console.log(user));  
    this.fireAuth.user.subscribe(user=> this.mostrarPerfilCliente(user));
  }

  mostrarPerfilCliente(user){
    this.afDB.object('usuarios/'+user.uid)
    .valueChanges().subscribe(usuarioGuardado => {
      this.usuario = usuarioGuardado;
    });  //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
}


  iraRealizarReserva(){
    this.navCtrl.setRoot('PerfilClientePage');
  }

  crearDatosUsuario(){
    this.afDB.database.ref('usuarios/'+this.usuario.id).set(this.usuario);
    this.navCtrl.setRoot('PerfilClientePage');
  }
}
