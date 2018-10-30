import { Component, ViewChild } from '@angular/core';
import { Nav, Platform, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import firebase from 'firebase';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { RealizarReservaPage } from '../pages/realizar-reserva/realizar-reserva';
import { RegistrarConductorPage } from '../pages/registrar-conductor/registrar-conductor';
import { DatosPersonalesUsuarioPage } from '../pages/datos-personales-usuario/datos-personales-usuario';
import { HistoricoViajesPage } from '../pages/historico-viajes/historico-viajes';
import { PenalizacionesPage } from '../pages/penalizaciones/penalizaciones';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  usuario: any;
  conductor: any = {};
  fotoPerfil: any;
  estado:any;

  pages: Array<{ title: string, component: any }>;

  constructor(public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public FirebaseAuth: AngularFireAuthModule,
    public AlertCtrl: AlertController) {
    this.initializeApp();
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));
    /*if (this.conductor.estado) {
      this.estado = this.conductor.estado;
    } else {
      this.estado = '';
    }*/

    this.pages = [
      { title: 'Realizar Reserva', component: RealizarReservaPage },
      { title: 'List', component: ListPage }
    ];

  }

  

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
          firebase.storage().ref('FotosUsuario/'+ user.uid +'/fotoPerfil.png').getDownloadURL().then((url) => {
            this.fotoPerfil = url;
          });
        });

      this.afDB.object('usuarios/' + user.uid + '/conductor')
        .valueChanges().subscribe(conductorGuardado => {
          this.conductor = conductorGuardado;
        });

        if (this.conductor.estado) {
          this.estado = this.conductor.estado;
          console.log("entro a parte 2");
        }

        console.log('conductor:'+ this.conductor);
        console.log('usuario:'+ this.usuario);

        
      //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  iraRealizarReserva() {
    this.nav.push(RealizarReservaPage);
  }

  iraRegistrarConductor() {
    console.log("estado: "+this.estado);
    if (this.conductor.estado == "PendienteRevision") {
      //alert('Tipoo de Vehiculo con exito');
      /**/let alert = this.AlertCtrl.create({
        title: 'Solicitud de conductor pendiente de Revisión',
        subTitle: 'Su solicitud aún se encuentra pendiente de revisión, en la brevedad sera revisada',
        buttons: [
          {
            text: "Aceptar",
            role: 'cancel'
          }
        ]
      });
      alert.present();/**/
    } else {
      this.nav.push(RegistrarConductorPage);
    }
  }

  iraLogin() {
    this.nav.push(LoginPage);
  }

  CerrarSesion(): void {
    this.fireAuth.auth.signOut();
    this.usuario = {};
    this.nav.setRoot(LoginPage);
  }

  iraDatosPersonales() {
    this.nav.push(DatosPersonalesUsuarioPage);
  }

  iraHistoricoViajes() {
    this.nav.push(HistoricoViajesPage);
  }

  iraPenalizaciones() {
    this.nav.push(PenalizacionesPage);
  }

  iraDatosConductor() {
    this.nav.push(RegistrarConductorPage);
  }



}
