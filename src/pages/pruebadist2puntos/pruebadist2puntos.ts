import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
declare var google;

/**
 * Generated class for the Pruebadist2puntosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pruebadist2puntos',
  templateUrl: 'pruebadist2puntos.html',
})
export class Pruebadist2puntosPage {

  Destination: any = '-32.4027606,-63.2415736';
  MyLocation: any = '-32.425725299999996, -63.2600678';

  latPosActual;
  lngPosActual;
  posActual;

  constructor(public navCtrl: NavController, public navParams: NavParams, public _ubicacionProv: UbicacionProvider) {
  
    _ubicacionProv.iniciarGeoLocalizacion().then(res => {
      console.log('rta promesa:');
      var posicion = res;
      this.latPosActual = posicion.coords.latitude;
      this.lngPosActual = posicion.coords.longitude;
      console.log(this.latPosActual);
      console.log(this.lngPosActual);
      this.calculateAndDisplayRoute(this.latPosActual, this.lngPosActual);
    })

  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Pruebadist2puntosPage');
    this.calculateAndDisplayRoute('hola','hola');
    this.getPosicionActual();
  }
  getPosicionActual() {

    return new Promise((resolve, reject) => {

      var map, infoWindow;
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 6
      });
      infoWindow = new google.maps.InfoWindow;

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
          var pos = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };

          infoWindow.setPosition(pos);
          infoWindow.setContent('Location found.');
          infoWindow.open(map);
          map.setCenter(pos);
          this.posActual = pos;
/*          this.posActual['posicion'] = pos;
          this.posActual['map'] = map;
          this.posActual['infoWindow'] = infoWindow;*/
        },
        )
      }
      resolve(this.posActual);
    });
  }

  cargarDatosMetodo() {

    return new Promise((resolve, reject) => {

      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 7,
        center: { lat: 41.85, lng: -87.65 }
      });
      var datos;
      datos[0] = directionsService;
      datos[1] = directionsDisplay;
      datos[2] = map;
      resolve(datos);
    });
  }


  calculateAndDisplayRoute(lat, lng) {
    var that = this;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: lat, lng: lng }
    });


    /*    var map = rta[2];
        var directionsDisplay = rta[1];
        var directionsService = rta[0];*/

    directionsDisplay.setMap(map);

        var pos = {
          lat: lat,
          lng: lng
        };


    directionsService.route({
      origin: lat+','+lng,
      destination: '-32.4027606,-63.2415736',
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }


}
