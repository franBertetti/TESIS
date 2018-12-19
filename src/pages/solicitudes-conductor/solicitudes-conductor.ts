import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';


/**
 * Generated class for the SolicitudesConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-solicitudes-conductor',
  templateUrl: 'solicitudes-conductor.html',
})
export class SolicitudesConductorPage {

  viajesComoConductor: any = [];
  cant;
  constructor(public navCtrl: NavController, public navParams: NavParams) {

      this.cant = this.navParams.get('cant');
      console.log(this.cant);
        this.viajesComoConductor = this.navParams.get('viajesaConfirmar');
        console.log(this.viajesComoConductor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitudesConductorPage');
  }

  cancelarSolicitud(i){
    firebase.database().ref('viaje/'+this.viajesComoConductor[i].numeroContratacion+'/Solicitud').set('Solicitud Rechazada');
    firebase.database().ref('viaje/'+this.viajesComoConductor[i].numeroContratacion+'/estado').set('Solicitud Rechazada');
    this.viajesComoConductor.splice(i, 1);
    this.viajesComoConductor.splice(i, 1);
  }

  aceptarSolicitud(i){
    firebase.database().ref('viaje/'+this.viajesComoConductor[i].numeroContratacion+'/Solicitud').set('Solicitud Aceptada');
    firebase.database().ref('viaje/'+this.viajesComoConductor[i].numeroContratacion+'/estado').set('En espera');
    this.viajesComoConductor.splice(i, 1);
    this.viajesComoConductor.splice(i, 1);
  }

  iraPerfilCliente(){
    this.navCtrl.setRoot(PerfilClientePage);
  }
}
