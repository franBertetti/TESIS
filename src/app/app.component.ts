import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { RealizarReservaPage } from '../pages/realizar-reserva/realizar-reserva';
import { RegistrarConductorPage } from '../pages/registrar-conductor/registrar-conductor';
import { DatosPersonalesUsuarioPage } from '../pages/datos-personales-usuario/datos-personales-usuario';
import { HistoricoViajesPage } from '../pages/historico-viajes/historico-viajes';
import { PenalizacionesPage } from '../pages/penalizaciones/penalizaciones';
//import { PerfilClientePage } from '../pages/perfil-cliente/perfil-cliente';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Realizar Reserva', component: RealizarReservaPage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  
  iraRealizarReserva(){
    this.nav.push(RealizarReservaPage);
  }

  iraRegistrarConductor(){
    this.nav.push(RegistrarConductorPage);
  }

  iraLogin(){
    this.nav.push(LoginPage);
  }

  CerrarSesion(){
    this.nav.setRoot(LoginPage);
  }

  iraDatosPersonales(){
    this.nav.push(DatosPersonalesUsuarioPage);
  }

  iraHistoricoViajes(){
    this.nav.push(HistoricoViajesPage);
  }

  iraPenalizaciones(){
    this.nav.push(PenalizacionesPage);
  }

  iraDatosConductor(){
    this.nav.push(RegistrarConductorPage);
  }



}
