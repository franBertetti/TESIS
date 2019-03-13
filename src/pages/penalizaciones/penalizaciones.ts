import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
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
  load;
  isCollapsed: any = [];


  constructor(public navCtrl: NavController, public navParams: NavParams, public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public usuarioServicio: UsuarioServicioProvider, public loading: LoadingController) {

    this.id = this.navParams.get('id');
    console.log(this.id);

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => { });
    usuarioServicio.changeMessage('asda');

    this.getPenalizaciones();
//d
    /*this.usuarioServicio.currentMesagge.subscribe(message => {
      for (var i = 0; i < this.penalizaciones.length; i++) {
        firebase.storage().ref('FotosUsuario/' + this.penalizaciones[i].idConductor + '/fotoPerfil.png').getDownloadURL().then((url) => {
          this.penalizaciones[i].fotoPerfil = url;
        });
      }
    })
*/
    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => { });
    usuarioServicio.changeMessage('asda');

  }

  toggleCollapse(i) {
    console.log(i);
    this.isCollapsed[i] = !this.isCollapsed[i];
    if (!this.isCollapsed[i]) {
      this.load = this.loading.create({
        spinner: 'crescent',
        duration: 1500
      });
      this.load.present();
      }
    }
    /*    this.usuarioServicio.changeMessage('asda');
    
        this.usuarioServicio.currentMesagge.subscribe(message => { });
        this.usuarioServicio.changeMessage('asda');*/
  

  getPenalizaciones() {
    firebase.database().ref('penalizacion/').orderByChild('fecha').on('child_added', (snapshot) => {
      var value = snapshot.val();
      value.numContratacion = snapshot.key;
      if (value.idCliente == this.id) {

        console.log('num fotos:' + value.cantFotos);
        console.log('num contratacion:' + value.numContratacion);


        /*value.fotosPenalizacion = [];
        var q = 0;
        for (q; q < value.cantFotos; q++) {s

          firebase.storage().ref('Penalizacion/' + value.numContratacion + '/foto' + q + '.png').getDownloadURL().then((url) => {

              console.log(url);
              value.fotosPenalizacion[q] = url;
              console.log('direccionURL:'+ q);
              console.log(value.fotosPenalizacion[q]);
            });
          
        }*/

        // value.fotosPenalizacion = this.getFotosPenalizacion(value.numContratacion, value.cantFotos);

        /*        for (var q = 0; q < value.cantFotos; q++){
          firebase.storage().ref('penalizacion/' + value.numContratacion + '/foto'+ q +'.png').getDownloadURL().then((url) => {
            value.fotosPenalizacion[q] = url;
          });          
        
        }
  */

        this.getFotosPenalizacion(value.cantFotos, value.numContratacion).then(rta => {
          value.fotosPenalizacion = rta;
          console.log(this.penalizaciones);
        });



        firebase.storage().ref('FotosUsuario/' + value.idConductor + '/fotoPerfil.png').getDownloadURL().then((url) => {
          value.fotoPerfil = url;
        });
        console.log("value:");
        console.log(value);
        this.penalizaciones.push(value);
        this.isCollapsed.push(true);
      }
    });

  }


  getFotosPenalizacion(cantFotos, numContratacion) {

    return new Promise((resolve, reject) => {

      var fotosPenalizacion = [];

      for (let i = 0; i < cantFotos; i++) {
        console.log('i=' + i);
        firebase.storage().ref('Penalizacion/' + numContratacion + '/foto' + i + '.png').getDownloadURL().then((url) => {
          console.log('foto n° ' + i + ':url:');
          fotosPenalizacion[i] = url;
          console.log(fotosPenalizacion[i]);
        });
      }

      resolve(fotosPenalizacion);

    });


  }

  /*
  getFotosPenalizacion(numContratacion, cantFotos) {

    var fotosPenalizacion = [];

    for (var q = 0; q < cantFotos; q++) {
      firebase.storage().ref('Penalizacion/' + numContratacion + '/foto' + q + '.png').getDownloadURL().then((url) => {
        console.log(url);
        fotosPenalizacion[q] = url;
      });
      if (q == cantFotos) { return fotosPenalizacion; }
    }
  }
*/
  ionViewDidLoad() {
    console.log('ionViewDidLoad PenalizacionesPage');
  }

}
