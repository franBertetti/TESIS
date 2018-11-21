import { Component, Query } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { DetalleConductorPage } from '../detalle-conductor/detalle-conductor';
import firebase from 'firebase';

/**
 * Generated class for the AdminConductoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//
@IonicPage()
@Component({
  selector: 'page-admin-conductores',
  templateUrl: 'admin-conductores.html',
})
export class AdminConductoresPage {

  usuarios = [];
  conductores: any = [];
  estados = [];

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase) {

    this.getUsuarios()
      .valueChanges().subscribe(usuariosGuardados => {
        this.conductores = usuariosGuardados;
        console.log(this.conductores);
      });
    console.log("conductores" + this.conductores);

    this.buscarEstadoConductores();
    console.log(this.estados);
    console.log(this.usuarios);
  }



  buscarEstadoConductores() {

    firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {

      let userRef = firebase.database().ref('usuarios/' + snapshot.key);
        var evaluarEstado = snapshot.val();
        if (evaluarEstado.estado != "-") {
        this.estados.push(snapshot.val());
        userRef.on('value', userSnap => {
          console.log(userSnap.val()); // trae bien los datos del usuario
          this.usuarios.push(userSnap.val());
        });
      }
    });

    console.log(this.estados);
    console.log(this.usuarios);

  }

  public getUsuarios() {
    return this.afDB.list('usuarios/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConductoresPage');
  }

  irADetalleConductor(id) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait',
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

    this.navCtrl.push(DetalleConductorPage, { id: id });
  }
}