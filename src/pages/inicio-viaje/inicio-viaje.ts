import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ResultadoBusquedaPage } from '../resultado-busqueda/resultado-busqueda';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';


import { NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

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
  //variables del geocodificacion inversa
  geocoder;
  map;
  infowindow;
  latilng;
  cargarUbicacion;

  //declaraciones autocompletar

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  direccionFormateada;
  localidadFormateada;
  provinciaFormateada;

  @ViewChild("search")
  public searchElementRef;



  today;
  TipoVehiculos = [];
  busqueda: any = {};
  tipoReserva: boolean = false;
  mensaje;
  faltaTipoVehiculo: boolean;
  faltaDireccion: boolean;
  usuario;
  geolocalizacion;

  btnInmediato = true;
  btnAnticipado = false;

  myForm: FormGroup;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public fireAuth: AngularFireAuth,
    public menuCtrl: MenuController,
    public _ubicacionProv: UbicacionProvider,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {
    this.menuCtrl.enable(true, 'myMenu');//para activar el menu desplegable en esta pagina
    this.today = new Date().toISOString();

    _ubicacionProv.iniciarGeoLocalizacion().then(res => {
      console.log('rta promesa:');
      this.geolocalizacion = res;
      /*console.log(this.geolocalizacion);
      console.log(this.geolocalizacion.coords);*/

      this.geolocalizacion.latitud = res['lat'];
      this.geolocalizacion.longitud = res['lng'];
      console.log(this.geolocalizacion.latitud);
      console.log(this.geolocalizacion.longitud);

    })

    this.myForm = this.formBuilder.group({
      direccion: ['', Validators.required]
    });

  }

  ionViewDidLoad() {

    console.log('ionViewDidLoad RealizarReservaPage');

    this.zoom = 15;

    //create search FormControl
    this.searchControl = new FormControl();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {

      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];

      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          var length = 0;
          length = place.address_components.length;

          for (let i = 0; i < length; i++) {
            console.log(place.address_components[i]);
          }

          console.log(place.geometry.location.lat);
          console.log(place.geometry.location.lng);
          console.log(place.formatted_address);
          //this.busqueda.direccion = place.formatted_address;
          this.direccionFormateada = place.formatted_address;
          console.log('localidad:');

          var divisiones = place.formatted_address.split(",", length);
          //console.log(divisiones);
          console.log("provincia:");
          console.log(divisiones[2]);

          //verify results
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          console.log('latitud:');
          this.latitude = place.geometry.location.lat();
          console.log(this.latitude);
          console.log('longitud:');
          this.longitude = place.geometry.location.lng();
          console.log(this.longitude);
          this.zoom = 15;
        });
      });
    });


    //this.initMap();

  }

  initMap(geolocalizacion) {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: 40.731, lng: -73.997 }
    });
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow;
    var infoLatLong = geolocalizacion.latitud + ',' + geolocalizacion.longitud;
    console.log(infoLatLong);
    var infoLatLong2 = this.geolocalizacion.latitud + ',' + this.geolocalizacion.longitud;
    console.log(infoLatLong2);
    console.log('-32.4027606,-63.2415736');
    this.geocodeLatLng(infoLatLong).then(res => {
      console.log('ubicacion cargada');
      this.myForm.value.direccion = res;
      //this.busqueda.direccion = res;
    });
  }

  geocodeLatLng(latitudlongitud) {
    return new Promise((resolve, reject) => {

      var input = latitudlongitud;
      var latlngStr = input.split(',', 2);
      var latlng = { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) };
      this.geocoder.geocode({ 'location': latlng }, (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.map.setZoom(16);
            var marker = new google.maps.Marker({
              position: latlng,
              map: this.map,
              center: { lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1]) }
            });
            this.infowindow.setContent(results[0].formatted_address);
            console.log(results[0].formatted_address);
            //this.busqueda.direccion = results[0].formatted_address;
            this.infowindow.open(this.map, marker);
          } else {
            window.alert('No results found');
          }
        } else {
          window.alert('Geocoder failed due to: ' + status);
        }
      });

      resolve(this.busqueda.direccion);

    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  buscarConductores(){
    alert(this.direccionFormateada);
  }

}
