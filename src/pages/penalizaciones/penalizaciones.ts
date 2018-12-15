import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';

/**
 * Generated class for the PenalizacionesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-penalizaciones',
  templateUrl: 'penalizaciones.html',
})
export class PenalizacionesPage {

  id;
  penalizaciones: any = [];
  message: string = 'hola';
  fotoPerfil;

  constructor(public navCtrl: NavController, public navParams: NavParams, public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public usuarioServicio: UsuarioServicioProvider) {



    this.id = this.navParams.get('id');
    console.log(this.id);

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => { });
    usuarioServicio.changeMessage('asda');

    this.getPenalizaciones();

    /*this.usuarioServicio.currentMesagge.subscribe(message => {
      for (var i = 0; i < this.penalizaciones.length; i++) {
        firebase.storage().ref('FotosUsuario/' + this.penalizaciones[i].idConductor + '/fotoPerfil.png').getDownloadURL().then((url) => {
          this.penalizaciones[i].fotoPerfil = url;
        });
      }
    })

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => { });
    usuarioServicio.changeMessage('asda');*/

  }

  getPenalizaciones() {
    firebase.database().ref('penalizacion/').orderByChild('fecha').on('child_added', (snapshot) => {
      var value = snapshot.val();
      if (value.idCliente == this.id) {

        firebase.storage().ref('FotosUsuario/' + value.idConductor + '/fotoPerfil.png').getDownloadURL().then((url) => {
          value.fotoPerfil = url;
        });
        console.log("value:");
        console.log(value);
        this.penalizaciones.push(value);
      }
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenalizacionesPage');
  }

}
