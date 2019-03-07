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
  marker: any;

  marker1:any;
  marker2:any;
  markerPar:boolean = true;
  markerImpar:boolean = false;

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

    this.map.setCenter(this.posActual);

    
    this.markerPar = this.markerPar!;
    this.markerImpar = this.markerImpar!;

    if (this.markerPar == true){
      this.marker2 = new google.maps.Marker({
        position: this.map.getCenter(),//new google.maps.LatLng(parseFloat(latitud), parseFloat(longitud))
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10, //tamaño
          strokeColor: '#f00', //color del borde
          strokeWeight: 5, //grosor del borde
          fillColor: '#00f', //color de relleno
          fillOpacity: 1// opacidad del relleno
        },
        map: this.map,
        labelAnchor: new google.maps.Point(10, 10), // Os lo explico después del CSS.
        labelClass: "label" // LA CLASE CSS, AQUÍ LLEGA LA MAGIA!!
      });

      this.marker1 = null;
    }

    if (this.markerImpar == true){
      this.marker1 = new google.maps.Marker({
        position: this.map.getCenter(),
        icon: {
          path: google.maps.SymbolPath.CIRCLE,
          scale: 10, //tamaño
          strokeColor: '#f00', //color del borde
          strokeWeight: 5, //grosor del borde
          fillColor: '#00f', //color de relleno
          fillOpacity: 1// opacidad del relleno
        },
        map: this.map,
        labelAnchor: new google.maps.Point(10, 10), // Os lo explico después del CSS.
        labelClass: "label" // LA CLASE CSS, AQUÍ LLEGA LA MAGIA!!
      });

      this.marker2 = null;
    }

    /*    setInterval(() => {
          console.log('Intervalo timeout');
    */
    this.directionsDisplay.addListener('directions_changed', () => {
      this.computeTotalDistance(this.directionsDisplay.getDirections());
      var result = this.directionsDisplay.getDirections();
      this.computeTotalDistance(result);
    });

    this.displayRoute(this.posActual, 'Corrientes 1400, Villa María, Córdoba', this.directionsService,
      this.directionsDisplay);

  }

  abrir() {
    alert(this.total);
  }

  displayRoute(origin, destination, service, display) {
    service.route({
      origin: origin,
      destination: destination,
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
    console.log('resultados:');
    console.log(result.routes['0'].legs['0'].distance.text);
    console.log(result.routes['0'].legs['0'].distance.value);
    console.log(result.routes['0'].legs['0'].duration.text);
    console.log(result.routes['0'].legs['0'].duration.value);
    console.log(result);
    var myroute = result.routes[0];
    console.log('reuta:');
    console.log(myroute);
    console.log(result.routes['0'].legs['0'].steps);
    console.log(result.routes['0'].legs['0'].steps[1].distance.text);
    console.log(result.routes['0'].legs['0'].steps[1].duration.text);
    console.log(result.routes['0'].legs['0'].steps[1].instructions);
    console.log(result.routes['0'].legs['0'].steps[1].maneuver);


    for (var i = 0; i < myroute.legs.length; i++) {
      total += myroute.legs[i].distance.value;
    };
    total = total / 1000;
    document.getElementById('total').innerHTML = total + ' km';
    this.total = total;
  }


}