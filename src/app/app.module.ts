import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';

import { MyApp } from './app.component';
import { LoginPage } from '../pages/login/login';
import { ListPage } from '../pages/list/list';
import { RegistrarUsuarioPageModule } from '../pages/registrar-usuario/registrar-usuario.module';
import { RestablecerPasswordPageModule } from '../pages/restablecer-password/restablecer-password.module';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { CodigoPasswordPageModule } from '../pages/codigo-password/codigo-password.module';
import { AyudaPageModule } from '../pages/ayuda/ayuda.module';
import { DatosPersonalesUsuarioPageModule } from '../pages/datos-personales-usuario/datos-personales-usuario.module';
import { RealizarReservaPageModule } from '../pages/realizar-reserva/realizar-reserva.module';
import { ResultadoBusquedaPageModule } from '../pages/resultado-busqueda/resultado-busqueda.module';
import { DatosReservaPageModule } from '../pages/datos-reserva/datos-reserva.module';
import { RegistrarConductorPageModule } from '../pages/registrar-conductor/registrar-conductor.module';
import { HistoricoViajesPageModule } from '../pages/historico-viajes/historico-viajes.module';
import { PenalizacionesPageModule } from '../pages/penalizaciones/penalizaciones.module';
import { ViajeSeleccionadoPageModule } from '../pages/viaje-seleccionado/viaje-seleccionado.module';
import { PenalizacionPageModule } from '../pages/penalizacion/penalizacion.module';
import { InicioViajePageModule } from '../pages/inicio-viaje/inicio-viaje.module';
import { FinalViajePageModule } from '../pages/final-viaje/final-viaje.module';
import { PerfilClientePageModule } from '../pages/perfil-cliente/perfil-cliente.module';


export const firebaseConfig = {
  apiKey: "AIzaSyAQEtqK6bbnV5BTVHH4mWWNDwTW8s-YYuw",
  authDomain: "tesis-1df62.firebaseapp.com",
  databaseURL: "https://tesis-1df62.firebaseio.com",
  projectId: "tesis-1df62",
  storageBucket: "tesis-1df62.appspot.com",
  messagingSenderId: "1037405461007"
};


@NgModule({
  declarations: [
    MyApp,
    LoginPage,
    ListPage
  ],
  imports: [
    IonicModule.forRoot(MyApp),
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    BrowserModule,
    RegistrarUsuarioPageModule,
    RestablecerPasswordPageModule,
    CodigoPasswordPageModule,
    AyudaPageModule,
    DatosPersonalesUsuarioPageModule,
    RealizarReservaPageModule,
    ResultadoBusquedaPageModule,
    DatosReservaPageModule,
    RegistrarConductorPageModule,
    HistoricoViajesPageModule,
    PenalizacionesPageModule,
    ViajeSeleccionadoPageModule,
    PenalizacionPageModule,
    InicioViajePageModule,
    FinalViajePageModule,
    PerfilClientePageModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    LoginPage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    ]
})
export class AppModule {}
