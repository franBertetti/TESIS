import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
/**
 * Generated class for the HistoricoViajesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-historico-viajes',
  templateUrl: 'historico-viajes.html',
})
export class HistoricoViajesPage {

  viajesComoUsuario: any = [];
  viajesComoConductor: any = [];

  viajesUsuario: any = [];
  viajesConductor: any = [];

  viajes: any = [];

  btnUsuario: boolean;
  btnConductor: boolean;

  id;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public usuarioServicio: UsuarioServicioProvider,
    public alertCtrl: AlertController) {
      this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

        usuarioServicio.changeMessage('asda');

        usuarioServicio.currentMesagge.subscribe(message => { });
        usuarioServicio.changeMessage('asda');

        this.id = this.navParams.get('id');
        console.log(this.id);

        this.getViajesComoUsuario();
        this.getViajesComoConductor();
        this.btnUsuario = true;
        this.btnConductor = false;
        console.log("viajes como usuario:");
        console.log(this.viajesComoUsuario);
        console.log("viajes como conductor:");
        console.log(this.viajesComoConductor);
    
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HistoricoViajesPage');
  }

  getViajesComoUsuario() {
    firebase.database().ref('viaje/').orderByChild('idUsuario').equalTo(this.id).on('child_added', (snapshot) => {
      var viaje = snapshot.val();
      if (viaje.estado == "finalizado") {
        firebase.storage().ref('FotosUsuario/' + viaje.idConductor + '/fotoPerfil.png').getDownloadURL().then((url) => {
          viaje.fotoPerfil = url;
        });
        console.log("viaje:");
        console.log(viaje);
        this.viajesComoUsuario.push(viaje);
        console.log(viaje);

      }
      
    });

  }

  getViajesComoConductor() {

    firebase.database().ref('viaje/').orderByChild('idConductor').equalTo(this.id).on('child_added', (snapshot) => {
      var viaje = snapshot.val();
      console.log("viaje:");
      console.log(viaje);
      if (viaje.estado == "finalizado") {
        this.viajesComoConductor.push(viaje);
      }
    });

  }

  traerViajesComoUsuario(id) {
    this.btnUsuario = true;
    this.btnConductor = false;

    this.viajesUsuario = this.viajesComoUsuario;
  }


  traerViajesComoConductor(id) {
    this.btnUsuario = false;
    this.btnConductor = true;

    this.viajesConductor = this.viajesComoConductor;
  }


}
