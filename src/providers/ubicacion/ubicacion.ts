import { Injectable } from '@angular/core';
import { Geolocation } from '@ionic-native/geolocation';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Subscription } from 'rxjs';

/*
  Generated class for the UbicacionProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UbicacionProvider {

  geocoder;
  map;
  infowindow;
  latilng;
  dirActual;




  posicion: AngularFirestoreDocument<any>; //lo defino de ese tipo para poder controlar los doc de la firestore
  watch: Subscription; ///es como definir un observador
  geolocalizacion: any = {};

  constructor(private geolocation: Geolocation,
    private afDB: AngularFirestore) {
    console.log('Hello UbicacionProvider Provider');
  }

  iniciarGeoLocalizacion() {

    return new Promise((resolve, reject) => {

      this.geolocation.getCurrentPosition().then((resp) => {
        // resp.coords.latitude
        // resp.coords.longitude
        this.geolocalizacion.latitud = resp.coords.latitude;
        this.geolocalizacion.longitud = resp.coords.longitude;

        console.log(resp.coords);
        console.log(resp.coords.longitude);
        console.log(resp.coords.latitude);

        resolve(resp);

      }).catch((error) => {
        console.log('Error getting location', error);
        resolve(false);
      });
    })
  }

  getDireccionActual(latitud, longitud) {

    return new Promise((resolve, reject) => {

      this.map = new google.maps.Map(document.getElementById('map'), {
        zoom: 8,
        center: { lat: 40.731, lng: -73.997 }
      });
      this.geocoder = new google.maps.Geocoder;
      this.infowindow = new google.maps.InfoWindow;

      var latlng = { lat: parseFloat(latitud), lng: parseFloat(longitud) };
      this.geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.map.setZoom(16);
            var marker = new google.maps.Marker({
              position: latlng,
              map: this.map
            });
            this.infowindow.setContent(results[0].formatted_address);
            console.log(results[0].formatted_address);
            this.dirActual = results[0].formatted_address;
            this.infowindow.open(this.map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

      resolve(this.dirActual);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }



}
