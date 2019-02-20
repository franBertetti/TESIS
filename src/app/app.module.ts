import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule, Loading } from 'ionic-angular';

import { AngularFireModule } from 'angularfire2';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { Firebase } from '@ionic-native/firebase';
import { Geolocation } from '@ionic-native/geolocation';
import { AgmCoreModule } from '@agm/core';

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
import { TipoVehiculoPageModule } from '../pages/tipo-vehiculo/tipo-vehiculo.module';
import { DetalletipoVehiculoPageModule } from '../pages/detalletipo-vehiculo/detalletipo-vehiculo.module';
//import { AdministradorPage } from '../pages/administrador/administrador';
import { Camera } from '@ionic-native/camera';
import { LocalidadPageModule } from '../pages/localidad/localidad.module';
import { DetalleLocalidadPageModule } from '../pages/detalle-localidad/detalle-localidad.module';
import { AdminConductoresPageModule } from '../pages/admin-conductores/admin-conductores.module';
import { DetalleConductorPageModule } from '../pages/detalle-conductor/detalle-conductor.module';
import { EstadoConductoresPageModule } from '../pages/estado-conductores/estado-conductores.module';
import { DetalleEstadoConductoresPageModule } from '../pages/detalle-estado-conductores/detalle-estado-conductores.module';
import { AdminVehiculosClientePageModule } from '../pages/admin-vehiculos-cliente/admin-vehiculos-cliente.module';
import { DetalleVehiculosClientePageModule } from '../pages/detalle-vehiculos-cliente/detalle-vehiculos-cliente.module';
import { FcmProvider } from '../providers/fcm/fcm';
import { HttpClientModule } from '@angular/common/http';
import { FotoPerfilServiceProvider } from '../providers/foto-perfil-service/foto-perfil-service';
import { EstadoUsuarioServiceProvider } from '../providers/estado-usuario-service/estado-usuario-service';
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';
import { ServicioBusquedaConductoresProvider } from '../providers/servicio-busqueda-conductores/servicio-busqueda-conductores';
import { Facebook } from '@ionic-native/facebook';
import { TipoPenalizacionPageModule } from '../pages/tipo-penalizacion/tipo-penalizacion.module';
import { DetalleTipoPenalizacionPageModule } from '../pages/detalle-tipo-penalizacion/detalle-tipo-penalizacion.module';
import { DatosConductorPageModule } from '../pages/datos-conductor/datos-conductor.module';
import { SolicitudesConductorPageModule } from '../pages/solicitudes-conductor/solicitudes-conductor.module';
import { UbicacionProvider } from '../providers/ubicacion/ubicacion';
import { Pruebadist2puntosPageModule } from '../pages/pruebadist2puntos/pruebadist2puntos.module';
import { PruebaDatosConductorPageModule } from '../pages/prueba-datos-conductor/prueba-datos-conductor.module';
import { AdministradorPageModule } from '../pages/administrador/administrador.module';
import { PruebadistconkmPageModule } from '../pages/pruebadistconkm/pruebadistconkm.module';



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
    AngularFirestoreModule,
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
    PerfilClientePageModule,
    TipoVehiculoPageModule,
    DetalletipoVehiculoPageModule,
    AdministradorPageModule,
    LocalidadPageModule,
    DetalleLocalidadPageModule,
    AdminConductoresPageModule,
    DetalleConductorPageModule,
    EstadoConductoresPageModule,
    DetalleEstadoConductoresPageModule,
    AdminVehiculosClientePageModule,
    DetalleVehiculosClientePageModule,
    HttpClientModule,
    NgxDatatableModule,
    TipoPenalizacionPageModule,
    DetalleTipoPenalizacionPageModule,
    DatosConductorPageModule,
    SolicitudesConductorPageModule,
    Pruebadist2puntosPageModule,
    PruebadistconkmPageModule,
    PruebaDatosConductorPageModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAK63fXQji9i7akGbEnPHQBxWRLjM8sNBs',
      libraries: ['geometry', 'places']
    })
    /*,
    AdministradorPage*/
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
    Camera,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    Firebase,
    FcmProvider,
    FotoPerfilServiceProvider,
    EstadoUsuarioServiceProvider,
    UsuarioServicioProvider,
    ServicioBusquedaConductoresProvider,
    Facebook,
    UbicacionProvider,
    Geolocation
  ]
})
export class AppModule { }
