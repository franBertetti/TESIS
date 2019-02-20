import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { PenalizacionPage } from '../penalizacion/penalizacion';
import { InicioViajePage } from '../inicio-viaje/inicio-viaje';
import firebase from 'firebase';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { InfoWindow } from '@agm/core/services/google-maps-types';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
declare var google;
/**
 * Generated class for the ViajeSeleccionadoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-viaje-seleccionado',
  templateUrl: 'viaje-seleccionado.html',
})
export class ViajeSeleccionadoPage {
  //variables de geoposicion
  Destination: any;
  MyLocation: any;
  //-32.425725299999996, -63.2600678
  latPosActual;
  lngPosActual;
  posActual;




  id;
  usuario;
  fotoPerfil;

  fotoPerfilCliente;

  numeroContratacion;
  viaje: any;
  image1: any;
  marker:any;
  map:any;


  constructor(public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public navParams: NavParams,
    public _ubicacionProv: UbicacionProvider) {

    if (this.navParams.get('viaje')) {
      this.viaje = this.navParams.get('viaje');
      this.numeroContratacion = this.viaje.numeroContratacion;
      this.Destination = this.viaje.latitud + ',' + this.viaje.longitud;
      var id = this.viaje.idUsuario;
      firebase.storage().ref('FotosUsuario/' + id + '/fotoPerfil.png').getDownloadURL().then((url) => {
        this.fotoPerfilCliente = url;
      });
    }
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad Pruebadist2puntosPage');
    //    this.calculateAndDisplayRoute('hola', 'hola');
    //  this.getPosicionActual();
    this.fireAuth.user.subscribe(user => {
      this.mostrarPerfilCliente(user).then(res => {
        console.log('res:');
        if (res == true) {
          setInterval(() => { 
            console.log('Intervalo timeout');
            this._ubicacionProv.iniciarGeoLocalizacion().then(res => {
              console.log('rta promesa:');
  
              this.posActual = res;
  
              this.latPosActual = res['lat'];
              this.lngPosActual = res['lng'];
              console.log(this.latPosActual);
              console.log(this.lngPosActual);
  
              this.calculateAndDisplayRoute(this.latPosActual, this.lngPosActual);
            })

          },10000);

          this._ubicacionProv.iniciarGeoLocalizacion().then(res => {
            console.log('rta promesa:');

            this.posActual = res;

            this.latPosActual = res['lat'];
            this.lngPosActual = res['lng'];
            console.log(this.latPosActual);
            console.log(this.lngPosActual);

            this.calculateAndDisplayRoute(this.latPosActual, this.lngPosActual);
          })
          
        }
      });
/*
      this._ubicacionProv.ubicacionEnTiempoReal().then(rta => {
        this.marker = new google.maps.Marker({
          //position: new google.maps.LatLng(rta['lat'], rta['lng']),
          position: new google.maps.LatLng(-32.4227045,-63.2617904),          
          map: this.map,
          scale: 1,
          title: 'aca estoy!',
          icon: this.image1 // Path al nuevo icono
        });
     
      })*/
    });
  }

  mostrarPerfilCliente(user) {

    return new Promise((resolve, reject) => {
      if (user) {
        this.id = user.uid;
        this.afDB.object('usuarios/' + user.uid)
          .valueChanges().subscribe(usuarioGuardado => {
            this.usuario = usuarioGuardado;
            console.log(this.usuario);
            firebase.storage().ref('FotosUsuario/' + user.uid + '/fotoPerfil.png').getDownloadURL().then((url) => {
              this.fotoPerfil = url;  
              resolve(true);
            });
          });
      }
    });

  }




  calculateAndDisplayRoute(lat, lng) {
    var infoWindow;
    infoWindow = new google.maps.InfoWindow;

    this.image1 = {
      url: this.fotoPerfil, // image is 512 x 512
      scaledSize : new google.maps.Size(50, 50)
  };

  var image = {
    url: this.fotoPerfilCliente, // image is 512 x 512
    scaledSize : new google.maps.Size(50, 50)
};

    var that = this;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: { lat: lat, lng: lng },
      icon: this.image1
    });

    this.marker = new google.maps.Marker({
      position: new google.maps.LatLng(lat, lng),
      map: this.map,
      scale: 1,
      title: 'aca estoy!',
      icon: this.image1 // Path al nuevo icono
    });

    var marker2 = new google.maps.Marker({
      position: new google.maps.LatLng(this.viaje.latitud, this.viaje.longitud),
      map: this.map,
      scale: 1,
      title: 'aca estoy!',
      icon: image // Path al nuevo icono
    });




    directionsDisplay.setMap(this.map);

    var pos = {
      lat: lat,
      lng: lng,
      icon: image
    };


    directionsService.route({
      origin: lat + ',' + lng,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions re4quest failed due to ' + status);
      }
    });

  }

  iraPenalizacion() {
    this.navCtrl.push(PenalizacionPage, { 'viaje': this.viaje });
  }

  iraInicioViaje() {
    //firebase.database().ref('viaje/' + this.numeroContratacion + '/estado').set('finalizado');
    this.navCtrl.push(InicioViajePage, {'viaje': this.viaje});
  }
}
