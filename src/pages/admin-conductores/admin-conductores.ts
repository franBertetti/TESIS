import { Component, Query } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,  MenuController } from 'ionic-angular';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { DetalleConductorPage } from '../detalle-conductor/detalle-conductor';
import firebase from 'firebase';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { AdministradorPage } from '../administrador/administrador';

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


  tablestyle = 'bootstrap';
 
  usuarios = [];
  conductores: any = [];
  estados = [];
  conductoresOrdenados:any = [];
  flag;
  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public usuarioServicio: UsuarioServicioProvider,
    public afDB: AngularFireDatabase) {
      this.menuCtrl.enable(false, 'myMenu');//para desactivar el menu desplegable en esta pagina

      console.log(this.navParams.get('flag'));
      console.log(this.navParams.get('data'));

      
//    this.getConductoresOrdenados();

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => {
    });
    
    usuarioServicio.changeMessage('asda');
    
    this.buscarEstadoConductores();
  
    console.log(this.estados);
    console.log(this.usuarios);

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => {
    });

    usuarioServicio.changeMessage('asda');

    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => {
    });

    usuarioServicio.changeMessage('asda');

  }

  iraMenuAdmin(){
    this.navCtrl.setRoot(AdministradorPage);
  }

  buscarEstadoConductores() {

    firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {

      let userRef = firebase.database().ref('usuarios/' + snapshot.key);
        var evaluarEstado = snapshot.val();
        if (evaluarEstado.estado != "-" && evaluarEstado.estado) {
        //this.estados.push(snapshot.val());
        userRef.on('value', userSnap => {
          var value = userSnap.val();
          var val  = snapshot.val();
          value.estado = val.estado;
          if (value.estado == 'PendienteAprobacion'){ value.color = '#E88E0C' };
          if (value.estado == 'Aprobado'){ value.color = '#32db64' };
          if (value.estado == 'DadoDeBaja'){ value.color = '#f53d3d' };
          if (value.estado == 'EnLinea'){ value.color = '#488aff' };
          if (value.estado == 'FueraDeLinea'){ value.color = '#0F0CD1' };
          if (value.estado == 'NoAprobado'){ value.color = '#E80028' };
          if (value.estado == 'Ocupado'){ value.color = '#D1970A' };
          //console.log(userSnap.val()); // trae bien los datos del usuari
          this.usuarios.push(value);
        });
      } 
    });

    console.log(this.estados);
    console.log(this.usuarios);

  }

  getConductoresOrdenados() {

    firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {
        var evaluarEstado = snapshot.val();
        if (evaluarEstado.estado != "-" && evaluarEstado.estado) {
          this.conductoresOrdenados.push(evaluarEstado);
      } 
    });

  }

  /*public ionViewWillEnter() {
    this.flag = this.navParams.get('value')|| null;
    if (this.flag == 'actualizar'){
      this.conductores = [];
      this.conductoresOrdenados = [];
      this.buscarEstadoConductores();
      console.log(this.estados);
      console.log(this.usuarios);
  
      
      this.usuarioServicio.changeMessage('asda');
  
      this.usuarioServicio.currentMesagge.subscribe(message => {
      });
  
      this.usuarioServicio.changeMessage('asda');
  

    }
} */

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConductoresPage');
  }

  irADetalleConductor(id) {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

    this.navCtrl.push(DetalleConductorPage, { id: id });
  }
}