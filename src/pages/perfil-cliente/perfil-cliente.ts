import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { RegistrarConductorPage } from '../registrar-conductor/registrar-conductor';
import { HistoricoViajesPage } from '../historico-viajes/historico-viajes';
import { DatosPersonalesUsuarioPage } from '../datos-personales-usuario/datos-personales-usuario';
import { PenalizacionesPage } from '../penalizaciones/penalizaciones';
import { ViajeSeleccionadoPage } from '../viaje-seleccionado/viaje-seleccionado';
import { RealizarReservaPage } from '../realizar-reserva/realizar-reserva';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the PerfilClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-cliente',
  templateUrl: 'perfil-cliente.html',
})
export class PerfilClientePage {

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController, public fireAuth:AngularFireAuth) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
    
  /*  firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
    console.log("logueado");    // User is signed in.
      } else {
    console.log("no logueado");        // No user is signed in.
      }
    });
  }*/

/*    var user = firebase.auth().currentUser;

    if (user) {
      console.log("logueado");    // User is signed in.
        } else {
      console.log("no logueado");        // No user is signed in.
        }
      };    
    
    /*firebase.auth().onAuthStateChanged(
      (user) => {  
      if (user) {
        this.opc="si";// User is signed in.
        
      } else {
        this.opc="no";  // No user is signed in.
      }
          });*/
        }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PerfilClientePage');
    //this.fireAuth.user.subscribe(user=> console.log(user));
  }

  iraRegistrarConductor(){
    this.navCtrl.push(RegistrarConductorPage);
  }

  iraHistoricoViajes(){
    this.navCtrl.push(HistoricoViajesPage);
  }

  iraDatosPersonales(){
    this.navCtrl.push(DatosPersonalesUsuarioPage);
  }

  iraPenalizaciones(){
    this.navCtrl.push(PenalizacionesPage);
  }

  iraViajeSeleccionado(){
    this.navCtrl.push(ViajeSeleccionadoPage);
  }

  iraRegistrarReserva(){
    this.navCtrl.push(RealizarReservaPage);
  }
}
