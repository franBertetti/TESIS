  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireDatabase } from 'angularfire2/database';

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
  usuario:any = {id:null, nombreCompleto:null, dni:null};
  

  constructor(public afDB: AngularFireDatabase, public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPersonalesUsuarioPage');
  }

  iraRealizarReserva(){
    this.navCtrl.setRoot('PerfilClientePage');
  }

  crearUsuario(){
    this.usuario.id = Date.now();
    this.afDB.database.ref('usuarios/'+this.usuario.id).set(this.usuario);
    this.navCtrl.setRoot('PerfilClientePage');
  }
}
