import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { FinalViajePage } from '../final-viaje/final-viaje';

declare var google;

/**
 * Generated class for the InicioViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-inicio-viaje',
  templateUrl: 'inicio-viaje.html',
})
export class InicioViajePage {
  Destination: any = '';
  MyLocation: any;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  calculateAndDisplayRoute() {
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 7,
      center: { lat: 41.85, lng: -87.65 }
    });
    directionsDisplay.setMap(map);


  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition((position) => {
        console.log('position:');
        console.log(position);
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        
        map.setCenter(pos);
        this.MyLocation = new google.maps.LatLng(pos);
      }, function () {  
      });
    } else {
      // Browser doesn't support Geolocation
    }

    directionsService.route({
      origin: this.MyLocation,
      destination: this.Destination,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad Prueba3Page');
  }


  iraFinalViaje(){
    this.navCtrl.push(FinalViajePage);
  }
}
