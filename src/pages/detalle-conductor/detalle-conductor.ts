import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AdminConductoresPage } from '../admin-conductores/admin-conductores';

/**
 * Generated class for the DetalleConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-detalle-conductor',
  templateUrl: 'detalle-conductor.html',
})
export class DetalleConductorPage {

  conductor: any;
  id = null;
  datosConductor: any = {};
  fotoDni: any;
  fotoCarnet: any;
  tarifa: any;
  estadoConductores: any = [];



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth) {
    this.id = navParams.get('id');/*con navparams tomo el valor que pase en el metodo gotodetail tomando el id que pasa el metodo */
    /*paso el id que tome para q el metodo use dicho id */



    if (this.id != 0) {
      this.getEstadoConductores()
        .valueChanges().subscribe(EstadoConductorGuardadas => {
          console.log(EstadoConductorGuardadas)
          this.estadoConductores = EstadoConductorGuardadas;
        });

      this.conductor = firebase.database().ref('usuarios/' + this.id);
      firebase.storage().ref('FotosConductor/' + this.id + '/fotoCarnet.png').getDownloadURL().then((url) => {
        this.fotoCarnet = url;
      });
      firebase.storage().ref('FotosConductor/' + this.id + '/fotoDni.png').getDownloadURL().then((url) => {
        this.fotoDni = url;
      });
      this.datosConductor = firebase.database().ref('conductor/' + this.id);
 /*
        console.log(this.id);
        this.getConductor(this.id)
              .valueChanges().subscribe( ConductorGuardado => {
                this.conductor = ConductorGuardado;
                console.log("conductor:"+this.conductor);
              });
      */}

  }

    public getEstadoConductores(){
    return this.afDB.list('estadoConductor/');
}  

  ionViewDidLoad() {
    console.log('ionViewDidLoad DetalleConductorPage');
    this.getConductor(this.id);
  }

  public getConductor(id) {
    this.afDB.object('conductor/' + id)
      .valueChanges().subscribe(conductorGuardado => {
        this.datosConductor = conductorGuardado;
        console.log("datosConductor:" + this.datosConductor);
      });

    this.afDB.object('usuarios/' + id)
      .valueChanges().subscribe(UsuarioGuardado => {
        this.conductor = UsuarioGuardado;
        console.log("conductor:" + this.conductor);
      });
  }

  actualizarEstadoSolicitud(){
    this.afDB.database.ref('conductor/'+this.id+'/estado').set(this.conductor.estado);
    alert('Estado de solicitud actualizada');
    this.navCtrl.push(AdminConductoresPage);
  }

//
}
