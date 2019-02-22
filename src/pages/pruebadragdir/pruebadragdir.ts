import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';


declare var google: any;

/**
 * Generated class for the PruebadragdirPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-pruebadragdir',
  templateUrl: 'pruebadragdir.html',
})
export class PruebadragdirPage {

  latPosActual;
  lngPosActual;
  posActual;

  total: number;

  map: any;
  directionsService: any;
  directionsDisplay: any;
  watch: any;


  constructor(public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public navParams: NavParams,
    public _ubicacionProv: UbicacionProvider,
    private geolocation: Geolocation) {

    this.watch = this.geolocation.watchPosition();
    this.watch.subscribe((data) => {

      this.latPosActual = data.coords.latitude;
      this.lngPosActual = data.coords.longitude;
      this.posActual = this.latPosActual + ',' + this.lngPosActual;
      console.log(this.posActual);
      this.initMap();
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PruebadragdirPage');

    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 4,
      center: { lat: -32.4117427, lng: -63.248404 }  // Australia.
    });

    this.directionsService = new google.maps.DirectionsService;
    this.directionsDisplay = new google.maps.DirectionsRenderer({
      draggable: true,
      map: this.map,
      panel: document.getElementById('right-panel')
    });

    this._ubicacionProv.iniciarGeoLocalizacion().then(res => {
      console.log('rta promesa:');


      this.latPosActual = res['lat'].toString();
      this.lngPosActual = res['lng'].toString();
      console.log(this.latPosActual);
      console.log(this.lngPosActual);

      this.posActual = this.latPosActual + ',' + this.lngPosActual;
      console.log(this.posActual);
      this.initMap();

    })

  }

  initMap() {

/*    setInterval(() => {
      console.log('Intervalo timeout');
*/
      this.directionsDisplay.addListener('directions_changed', () => {
        this.computeTotalDistance(this.directionsDisplay.getDirections());
        var result = this.directionsDisplay.getDirections();
        this.computeTotalDistance(result);
      });

      /*
            this._ubicacionProv.iniciarGeoLocalizacion().then(res => {
              var lat = res['lat'].toString();
              var lng = res['lng'].toString();
              var posActual = lat + ',' + lng;
      
      
            })
            */
      this.displayRoute(this.posActual, 'Corrientes 1400, Villa María, Córdoba', this.directionsService,
        this.directionsDisplay);

      /*      this._ubicacionProv.iniciarGeoLocalizacion().then((rta) => {
      
              var posicion = rta['lat'].toString()+','+rta['lng'].toString(); 
      
              this.displayRoute(posicion, 'Corrientes 1400, Villa María, Córdoba', this.directionsService,
              this.directionsDisplay);
      
            });
          /*  
            this.displayRoute(this.latPosActual+ ',' +this.lngPosActual, 'Corrientes 1400, Villa María, Córdoba', this.directionsService,
              this.directionsDisplay);
          */
//    }, 10000);


  }

  abrir() {
    alert(this.total);
  }

  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
      /*waypoints: [{ location: 'Adelaide, SA' }, { location: 'Broken Hill, NSW' }],*/
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        display.setDirections(response);
      } else {
        alert('Could not display directions due to: ' + status);
      }
    });
  }

  computeTotalDistance(result) {
    var total = 0;
    console.log(result);
    var myroute = result.routes[0];
    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    };
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
    this.total = total;
  }


}
