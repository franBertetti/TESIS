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

  posicion: AngularFirestoreDocument<any>; //lo defino de ese tipo para poder controlar los doc de la firestore
  watch: Subscription; //es como definir un observador
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

}
