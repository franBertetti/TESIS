import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { AdminConductoresPage } from '../admin-conductores/admin-conductores';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { FcmProvider } from '../../providers/fcm/fcm';
import { EstadoUsuarioServiceProvider } from '../../providers/estado-usuario-service/estado-usuario-service';

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
  flag = true;

  usuarios:any = [];
  cantUsuarios:any;
  
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public usuarioServicio: UsuarioServicioProvider,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    public loadingCtrl: LoadingController,
    public estadoUsuarioServicio: EstadoUsuarioServiceProvider,
    public fcm: FcmProvider) {
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

  public getEstadoConductores() {
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
        this.conductor.estado = this.datosConductor.estado;
        console.log("conductor:" + this.conductor);
      });
  }

  ionViewWillLeave() {
    this.navCtrl.getPrevious().data.value ='actualizar';
}

  actualizarEstadoSolicitud() {
    var usuarios:any = [];
    var cantUsuarios: any;
    
    this.afDB.database.ref('conductor/' + this.id + '/estado').set(this.conductor.estado);
    alert('Estado de solicitud actualizada');
    this.fcm.setNuevoEstadoConductor(this.conductor.id, this.conductor.token, this.conductor.nombreCompleto, this.conductor.estado);
    //this.usuarioServicio.changeMessage('asdas');
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 2000
    });
    loading.present();

    this.estadoUsuarioServicio.buscarEstadoConductores().then(res => {
      usuarios = res['usuarios'];
      cantUsuarios = res['cant'];  
      console.log(usuarios);
      console.log(cantUsuarios);

      this.navCtrl.setRoot(AdminConductoresPage, {'usuar': 'hola'});
    });

  }
}

