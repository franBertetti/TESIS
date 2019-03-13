import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import firebase from 'firebase';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { PenalizacionPage } from '../penalizacion/penalizacion';
import { InicioViajePage } from '../inicio-viaje/inicio-viaje';

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

this.numTelefono = firebase.database().ref('usuarios/' + this.viaje.idUsuario + '/numCelular');
console.log(this.numTelefono);
console.log(this.numTelefono.toString());

  }

ionViewDidLoad() {
  console.log('ionViewDidLoad ConductorEnDestinoPage');
}

llamarPasajero(){

  window.open('tel:' + this.numTelefono.toString());

  /*       this.callNumber.callNumber("18001010101", true)
         .then(res => console.log('Launched dialer!', res))
         .catch(err => console.log('Error launching dialer', err)); */
}

iraPenalizacion() {
  this.navCtrl.push(PenalizacionPage, { 'viaje': this.viaje });
}

iraInicioViaje() {
  this.navCtrl.push(InicioViajePage, { 'viaje': this.viaje });
}


}
