import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import firebase from 'firebase';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { FcmProvider } from '../../providers/fcm/fcm';


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

  rta;
  viajesComoConductor: any = [];
  cant;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    public AlertCtrl: AlertController,
    public fcm: FcmProvider) {

    this.cant = this.navParams.get('cant');
    console.log(this.cant);
    this.viajesComoConductor = this.navParams.get('viajesaConfirmar');
    console.log(this.viajesComoConductor);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SolicitudesConductorPage');
  }

  cancelarSolicitud(i) {
    let alert = this.AlertCtrl.create({
      title: 'Solicitud Cancelada',
      buttons: [
        {
          text: "Ok",
          role: 'cancel',
          handler: data => {

            this.fcm.setConfirmacionSolicitudReserva(
              this.rta = 'Cancelada',
              this.viajesComoConductor[i].nombreCliente,
              this.viajesComoConductor[i].nombreConductor,
              this.viajesComoConductor[i].direccionDeBusqueda,
              this.viajesComoConductor[i].fecha,
              this.viajesComoConductor[i].hora,
              this.viajesComoConductor[i].numeroContratacion,
              this.viajesComoConductor[i].idUsuario,
              this.viajesComoConductor[i].idConductor);

            console.log('Cancel clicked');
            firebase.database().ref('viaje/' + this.viajesComoConductor[i].numeroContratacion + '/Solicitud').set('Solicitud Rechazada');
            firebase.database().ref('viaje/' + this.viajesComoConductor[i].numeroContratacion + '/estado').set('Solicitud Rechazada');
            this.viajesComoConductor.splice(i, 1);
            this.viajesComoConductor.splice(i, 1);

          }
        }
      ]
    });
    alert.present();

  }

  aceptarSolicitud(i) {
    let alert = this.AlertCtrl.create({
      title: 'Solicitud Aceptada',
      buttons: [
        {
          text: "Ok",
          role: 'cancel',
          handler: data => {


            this.fcm.setConfirmacionSolicitudReserva(
              this.rta = 'Aceptada',
              this.viajesComoConductor[i].nombreCliente,
              this.viajesComoConductor[i].nombreConductor,
              this.viajesComoConductor[i].direccionDeBusqueda,
              this.viajesComoConductor[i].fecha,
              this.viajesComoConductor[i].hora,
              this.viajesComoConductor[i].numeroContratacion,
              this.viajesComoConductor[i].idUsuario,
              this.viajesComoConductor[i].idConductor);

            firebase.database().ref('viaje/' + this.viajesComoConductor[i].numeroContratacion + '/Solicitud').set('Solicitud Aceptada');
            firebase.database().ref('viaje/' + this.viajesComoConductor[i].numeroContratacion + '/estado').set('En espera');
            this.viajesComoConductor.splice(i, 1);
            this.viajesComoConductor.splice(i, 1);
          }
        }
      ]
    });
    alert.present();
  }

  iraPerfilCliente() {
    this.navCtrl.setRoot(PerfilClientePage);
  }
}
