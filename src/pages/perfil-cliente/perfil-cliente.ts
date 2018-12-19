import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { RegistrarConductorPage } from '../registrar-conductor/registrar-conductor';
import { HistoricoViajesPage } from '../historico-viajes/historico-viajes';
import { DatosPersonalesUsuarioPage } from '../datos-personales-usuario/datos-personales-usuario';
import { PenalizacionesPage } from '../penalizaciones/penalizaciones';
import { ViajeSeleccionadoPage } from '../viaje-seleccionado/viaje-seleccionado';
import { RealizarReservaPage } from '../realizar-reserva/realizar-reserva';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { SolicitudesConductorPage } from '../solicitudes-conductor/solicitudes-conductor';


/**
 * Generated class for the PerfilClientePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-perfil-cliente',
  templateUrl: 'perfil-cliente.html',
})
export class PerfilClientePage {

  usuario: any = {};
  conductor: any = {};
  public uid: any;
  fotoPerfil: any;
  fotoPerfilDesdeBd: any;
  flag;
  viajesComoUsuario: any = [];
  viajesComoConductor: any = [];

  viajesUsuario: any = [];
  viajesConductor: any = [];

  viajes: any = [];

  btnUsuario: boolean;
  btnConductor: boolean;

  rtaEstado:any;

  estaConduciendo:boolean;

  mensajeNoConductor = ' ';

  cantViajesConductor = 0;
  cantViajesCliente = 0;
  cantViajesAconfirmar = 0;

  viajesaConfirmar: any = [];



  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public usuarioService: UsuarioServicioProvider,
    public alertCtrl: AlertController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

    //this.usuarioService.changeMessage('ASDA');

    var database = firebase.database();
    this.uid = firebase.auth().currentUser.uid;

    if (this.navParams.get('Photo')) {
      this.fotoPerfil = this.navParams.get('Photo');
      this.flag = 0;
      //this.usuarioService.changeMessage('ASDA');
    } else {
      this.fotoPerfil = "la otra foto";
      this.flag = 1;
    }

    if (this.navParams.get('flag')) {
      this.flag = false;
    }

    if (this.navParams.get('preguntarEstadoConductor')) {
      let prompt = this.alertCtrl.create({
        title: '¿Desea seguir habilitado para conducir?',
        message: 'Seleccionar:',
        inputs : [
        {
            type:'radio',
            label:'Continuar En Linea',
            value:'EnLinea',
            name:'estado'
        },
        {
            type:'radio',
            label:'No mostrarme como disponible',
            value:'FueraDeLinea', 
            name:'estado'
        }],
        buttons : [
        {
            text: "Aceptar",
            handler: data => {
            console.log("search clicked");
            this.rtaEstado = data; 
            if (this.rtaEstado == 'FueraDeLinea'){
              this.estaConduciendo = false;
            }
            if (this.rtaEstado == 'EnLinea'){
              this.estaConduciendo = true;
            }

            firebase.database().ref('conductor/'+this.uid+'/estado').set(this.rtaEstado);
            }
        }]});
        console.log(this.rtaEstado);
        prompt.present();
        console.log(name);

    }


    console.log("uid:");
    console.log(this.uid);

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
    console.log('ionViewDidLoad PerfilClientePage');
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));
  }

  getViajesComoUsuario() {
    firebase.database().ref('viaje/').orderByChild('idUsuario').equalTo(this.uid).on('child_added', (snapshot) => {
      var viaje = snapshot.val();
      if (viaje.estado != 'Solicitud Rechazada' && viaje.estado != "cancelado" && viaje.estado != "finalizado") {

        firebase.storage().ref('FotosUsuario/' + viaje.idConductor + '/fotoPerfil.png').getDownloadURL().then((url) => {
          viaje.fotoPerfil = url;
        });
        console.log("viaje:");
        console.log(viaje);
        this.viajesComoUsuario.push(viaje);
        this.cantViajesCliente++;
        console.log(viaje);

      }
      
    });

  }

  getViajesComoConductor() {

    firebase.database().ref('viaje/').orderByChild('idConductor').equalTo(this.uid).on('child_added', (snapshot) => {
      var viaje = snapshot.val();
      console.log("viaje:");
      console.log(viaje);
      if (viaje.estado != 'Solicitud Rechazada' && viaje.estado != "cancelado" && viaje.estado != "finalizado" && viaje.estado != 'En espera de confirmación') {
        this.cantViajesConductor++;
        this.viajesComoConductor.push(viaje);
      }
      if (viaje.estado == 'En espera de confirmación'){
        this.viajesaConfirmar.push(viaje);
        this.cantViajesAconfirmar++;
      }

    });
//
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

  cambiarEstado(){
    console.log(this.estaConduciendo);
    if (this.estaConduciendo == true){
       console.log('true');
       let alert = this.alertCtrl.create({
        title: 'Usted ahora se encuentra En Linea',
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
       firebase.database().ref('conductor/'+this.uid+'/estado').set('EnLinea');
    }
    if (this.estaConduciendo == false){
      let alert = this.alertCtrl.create({
        title: 'Usted ahora se encuentra Fuera En Linea',
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
       console.log('false');
       firebase.database().ref('conductor/'+this.uid+'/estado').set('FueraDeLinea');
    }
  }

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
          if (this.flag == 1) {
            firebase.storage().ref('FotosUsuario/' + user.uid + '/fotoPerfil.png').getDownloadURL().then((url) => {
              this.fotoPerfil = url;
            });
            console.log("uid:");
            console.log(this.uid);
          }

        });

      this.afDB.object('conductor/' + user.uid)
        .valueChanges().subscribe(conductorGuardado => {
          this.conductor = conductorGuardado;

          if (this.conductor.estado == undefined){
            this.mensajeNoConductor = 'Usted no esta registrado como conductor.';
          }

          if (this.conductor.estado == 'PendienteAprobacion'){
            this.mensajeNoConductor = 'Usted no esta registrado como conductor.';
          }

          if (this.conductor.estado != undefined && this.conductor.estado != 'PendienteAprobacion' ) {
            if (this.conductor.estado == 'Aprobado' || this.conductor.estado == 'FueraDeLinea' ){
              this.estaConduciendo = false;
            }
            if (this.conductor.estado == 'EnLinea'){
              this.estaConduciendo = true;
            }
          }

        });




    }

  }

  irAsolicitudesDeViaje(){
    this.navCtrl.push(SolicitudesConductorPage, {'viajesaConfirmar': this.viajesaConfirmar,'cant': this.cantViajesAconfirmar});
  }

  iraRegistrarConductor() {
    this.navCtrl.push(RegistrarConductorPage);
  }

  iraHistoricoViajes() {
    this.navCtrl.push(HistoricoViajesPage);
  }

  iraDatosPersonales() {
    this.navCtrl.push(DatosPersonalesUsuarioPage);
  }

  iraPenalizaciones() {
    this.navCtrl.push(PenalizacionesPage);
  }

  iraViajeSeleccionado(viaje) {
    this.navCtrl.push(ViajeSeleccionadoPage, { 'viaje': viaje });
  }

  iraRealizarReserva() {
    this.navCtrl.push(RealizarReservaPage);
  }
}


/* en constructor

firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
    console.log("logueado");    // User is signed in.
      } else {
    console.log("no logueado");        // No user is signed in.
      }
    });
  }*/

/*    var user = firebase.auth().currentUser;

    if (user) {
      console.log("logueado");    // User is signed in.
        } else {
      console.log("no logueado");        // No user is signed in.
        }
      };    
    
    /*firebase.auth().onAuthStateChanged(
      (user) => {  
      if (user) {
        this.opc="si";// User is signed in.
        
      } else {
        this.opc="no";  // No user is signed in.
      }
          });*/
