import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PenalizacionPage } from '../penalizacion/penalizacion';
import { InicioViajePage } from '../inicio-viaje/inicio-viaje';
import { PruebadragdirPage } from '../pruebadragdir/pruebadragdir';

/**
 * Generated class for the ConductorEnDestinoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-conductor-en-destino',
  templateUrl: 'conductor-en-destino.html',
})
export class ConductorEnDestinoPage {

  load;
  viaje: any;
  numTelefono;
  constructor(public navCtrl: NavController, public navParams: NavParams, private callNumber: CallNumber, public loading: LoadingController) {

    this.load = this.loading.create({
      spinner: 'crescent'
    });
    this.load.present();

    this.viaje = this.navParams.get('viaje');
console.log(this.viaje);
firebase.storage().ref('FotosUsuario/' + this.viaje.idUsuario + '/fotoPerfil.png').getDownloadURL().then((url) => {
  this.viaje.fotoPerfil = url;
  this.load.dismiss();
});

firebase.database().ref('usuarios/').orderByChild('id').equalTo(this.viaje.idUsuario).on('child_added', snap => {
  var valor = snap.val();
  console.log('valor:');
  console.log(valor);
  this.numTelefono = valor.numCelular;
});

  }

ionViewDidLoad() {
  console.log('ionViewDidLoad ConductorEnDestinoPage');
}

llamarPasajero(){

  window.open('tel:' + this.numTelefono);

  /*       this.callNumber.callNumber("18001010101", true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err)); */
}

iraPenalizacion() {
  this.navCtrl.push(PenalizacionPage, { 'viaje': this.viaje });
}

iraInicioViaje() {
  this.navCtrl.push(PruebadragdirPage, { 'viaje': this.viaje });
}


}
