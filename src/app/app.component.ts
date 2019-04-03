import { FcmProvider } from '../providers/fcm/fcm';
import { ToastController, LoadingController } from 'ionic-angular';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';

import {
  BackgroundGeolocation,
  BackgroundGeolocationConfig,
  BackgroundGeolocationResponse,
  BackgroundGeolocationEvents
} from '@ionic-native/background-geolocation/ngx';


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
import { UsuarioServicioProvider } from '../providers/usuario-servicio/usuario-servicio';
import { Observable } from 'rxjs/Rx';
import { AngularFireObject, AngularFireList } from 'angularfire2/database';
import { ViewEncapsulation, OnInit } from '@angular/core';

import { timer } from 'rxjs/observable/timer';
import { DatosConductorPage } from '../pages/datos-conductor/datos-conductor';
import { Pruebadist2puntosPage } from '../pages/pruebadist2puntos/pruebadist2puntos';
import { PruebaDatosConductorPage } from '../pages/prueba-datos-conductor/prueba-datos-conductor';
import { AdministradorPage } from '../pages/administrador/administrador';
import { PruebadistconkmPage } from '../pages/pruebadistconkm/pruebadistconkm';
import { PruebadragdirPage } from '../pages/pruebadragdir/pruebadragdir';
import { ViajeSeleccionadoPage } from '../pages/viaje-seleccionado/viaje-seleccionado';
import { InicioViajePage } from '../pages/inicio-viaje/inicio-viaje';
//
declare var window;

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  usuario: any;
  conductor: any = {};
  fotoPerfil: any;
  estado: any;
  email: any;

  arr: any;

  logs: string[] = [];

  estadoConductorSeteado = '-';

  showSplash = true; // <-- show animation

  id;

  yaSolicitoRegistro: boolean;

  cant: number = 0;

  pages: Array<{ title: string, component: any }>;

  datoPrueba: any = {};

  private users$: Observable<any[]>;
  message: string = 'hola';
  constructor(public platform: Platform,
    public loadingCtrl: LoadingController,
    public statusBar: StatusBar,
    private backgroundGeolocation: BackgroundGeolocation,
    public splashScreen: SplashScreen,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public FirebaseAuth: AngularFireAuthModule,
    public AlertCtrl: AlertController,
    public fcm: FcmProvider,
    public usuarioService: UsuarioServicioProvider,
    public toastCtrl: ToastController) {


    platform.ready().then(() => {
      fcm.getToken();

      // Listen to incoming messages
      fcm.listenToNotifications().pipe(
        tap(msg => {
          // show a toast
          const toast = toastCtrl.create({
            message: msg.body,
            duration: 3000
          });
          toast.present();
        })
      )
        .subscribe()
    }

    )

<<<<<<< HEAD


    //codigo de onesignal de linea 45 a 64
    /*
      platform.ready().then(() => {
        statusBar.styleDefault();
        splashScreen.hide();
    
        // OneSignal Code start:
        // Enable to debug issues:
        // window["plugins"].OneSignal.setLogLevel({logLevel: 4, visualLevel: 4});
    
        var notificationOpenedCallback = function(jsonData) {
          console.log('notificationOpenedCallback: ' + JSON.stringify(jsonData));
        };
    
        window["plugins"].OneSignal
asdas          .handleNotificationOpened(notificationOpenedCallback)
          .endInit();
      });

      */
=======
>>>>>>> 890615f34b2a680af2e0b26a990224b2473c0812
    this.arr = [];
    this.initializeApp();
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));

    this.pages = [
      { title: 'Realizar Reserva', component: RealizarReservaPage },
      { title: 'List', component: ListPage }
    ];

    console.log('el mensaje es:');
    console.log(this.message);

    console.log('el mensaje es:');
//    this.usuarioService.currentMesagge.subscribe(message => {

      if (this.id != undefined) {
        firebase.storage().ref('FotosUsuario/' + this.id + '/fotoPerfil.png').getDownloadURL().then((url) => {
          console.log(this.fotoPerfil);
          console.log(url);
          this.fotoPerfil = url;
          console.log(this.fotoPerfil);
        });

        this.afDB.object('conductor/' + this.id)
          .valueChanges().subscribe(conductorGuardado => {
            this.conductor = conductorGuardado;
            if (this.conductor.estado) {
              this.estadoConductorSeteado = this.conductor.estado;
            } else {
              this.estadoConductorSeteado = '-';
            }


      //      this.message = message;
            console.log(this.message);
          });
      }
   // });

    //// this.newMessage();

    console.log('el objeto es:');
    console.log(this.datoPrueba);

    this.usuarioService.currentObjeto.subscribe(objet => {
      this.datoPrueba = objet;
    })

    console.log('el objeto es:');
    console.log(this.datoPrueba);

    this.newObjeto();

    console.log('el objeto es:');
    console.log(this.datoPrueba);




  }

  ngOnInit() {
/*    console.log('el mensaje es:');
    this.usuarioService.currentMesagge.subscribe(message=> {
      this.message = message;
      console.log(this.message);
    });


    this.newMessage();
    
  */}




  newMessage() {
    this.usuarioService.changeMessage('hello from appComponent');
  }

  newObjeto() {
    this.usuarioService.changeObject({ title: 'qisio', description: 'bebelo con soda', name: 'narniaaaa' });
  }



  mostrarPerfilCliente(user) {
    if (user) {
      this.id = user.uid;
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
          firebase.storage().ref('FotosUsuario/' + user.uid + '/fotoPerfil.png').getDownloadURL().then((url) => {
            this.fotoPerfil = url;
          });
        });

      // if (this.usuario.email !== 'admin@admin.com') {

      this.afDB.object('conductor/' + user.uid)
        .valueChanges().subscribe(conductorGuardado => {
          this.conductor = conductorGuardado;
          if (conductorGuardado != null && this.conductor.estado != undefined) {
            this.estadoConductorSeteado = this.conductor.estado;
          } else {
            this.estadoConductorSeteado = '-';
          }

          /* if (!this.conductor.estado || this.conductor.estado == undefined || this.conductor.estado == null){
             this.yaSolicitoRegistro = false;
             this.conductor.estado = '';
           } else {
             this.yaSolicitoRegistro = true;
           }*/
        });




      /* if (this.conductor.estado) {
         this.estado = this.conductor.estado;
         console.log("entro a parte 2");
       }*/

      console.log('conductor:' + this.conductor);
      console.log('usuario:' + this.usuario);


      //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
    }

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      //  this.splashScreen.hide();
      // timer(3000).subscribe(() => this.showSplash = false) // <-- hide animation after 3s

      const config: BackgroundGeolocationConfig = {
        desiredAccuracy: 10,
        stationaryRadius: 20,
        distanceFilter: 30,
        debug: true,
        stopOnTerminate: false,
        interval: 10000
      };


        this.backgroundGeolocation.configure(config).then(() => {
          this.backgroundGeolocation.on
            (BackgroundGeolocationEvents.location).subscribe(
              (location: BackgroundGeolocationResponse) => {
               // var locationstr = localStorage.getItem("location");
                console.log(location);
                var posicion = location.latitude + ',' + location.longitude;
                this.afDB.database.ref('pruebaBack/latlng/').set(posicion);
                this.cant = this.cant + 1;
                this.afDB.database.ref('pruebaBack/cant/').set(this.cant);
                //console.log(locationstr);
                /*if (locationstr){
                  if  (locationstr['0'].latitude){
                  console.log(locationstr);
                }
                }
                this.lat = location.latitude;
                this.lng = location.longitude;
                console.log(location.latitude);
                console.log(location.longitude);
*/
                /*if (locationstr == null) {
                  this.arr.push(location);
                  console.log(this.arr);
                } else {
                  //console.log(locationarr);
                  var locationarr = JSON.parse(locationstr);
                  this.arr = locationstr;
                  //console.log(this.arr);
                }*/
                //localStorage.setItem("location", JSON.stringify(this.arr));
              })

              this.backgroundGeolocation.start();
        })
        window.app = (this);


    });
  }

  iraRealizarReserva() {
    this.nav.push(RealizarReservaPage);
  }

  iraRegistrarConductor() {

    this.nav.push(RegistrarConductorPage);


  }

  iraLogin() {
    this.nav.push(LoginPage);
  }

  CerrarSesion(): void {
    this.fireAuth.auth.signOut();
    this.usuario = {};
    this.usuarioService.Usuario = {};
    this.nav.setRoot(LoginPage, { 'splash': false, 'usuario': {} });
  }

  iraDatosPersonales() {
    this.nav.push(DatosPersonalesUsuarioPage, { 'flag': true });
  }

  iraHistoricoViajes() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando viajes..',
      duration: 2000
    });
    loading.present();

    this.nav.push(HistoricoViajesPage, { 'id': this.id });
  }

  iraPenalizaciones() {
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 2000
    });
    loading.present();
    this.nav.push(PenalizacionesPage, { 'id': this.id });
  }

  iraDatosConductor() {
    if (this.conductor.estado == "PendienteAprobacion") {
      //console.log("estado: "+this.estado);
        //alert('Tipoo de Vehiculo con exito');
        /**/let alert = this.AlertCtrl.create({
        title: 'Solicitud de conductor pendiente de Aprobación',
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
      this.nav.push(DatosConductorPage, { 'id': this.id, 'flag': true });
    }
  }


}
