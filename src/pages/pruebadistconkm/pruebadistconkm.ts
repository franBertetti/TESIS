import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs';




declare var google;

/**
 * Generated class for the Pruebadist2puntosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.s
 */

@IonicPage()
@Component({
  selector: 'page-pruebadistconkm',
  templateUrl: 'pruebadistconkm.html',
})
export class PruebadistconkmPage {

  Destination: any = '-32.425725299999996, -63.2600678';
  MyLocation: any;
  //-32.425725299999996, -63.2600678
  latPosActual;
  lngPosActual;
  posActual;
 
  direccion;

conductor;


  id;
  usuario;
  fotoPerfil;
  myForm: FormGroup;
  direccionFormateada;
  localidadFormateada;
  provinciaFormateada;

  watch: Subscription; //es como definir un observador 

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;

  watchPosition;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public navParams: NavParams,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public fireAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public afDB: AngularFireDatabase,
    public _ubicacionProv: UbicacionProvider) {

      

    //this._ubicacionProv.inicializarConductor();

      this.myForm = this.formBuilder.group({
        direccion: ['', Validators.required]
      });
  
  
      this.zoom = 4;
      this.latitude = 39.8282;
      this.longitude = -98.5795;

      this.searchControl = new FormControl();


      /*
        this.fireAuth.user.subscribe(user => {
          this.mostrarPerfilCliente(user); 
        });
    
    
        _ubicacionProv.iniciarGeoLocalizacion().then(res => {
          console.log('rta promesa:');
    
          this.posActual = res;
    
          this.latPosActual = res['lat'];
          this.lngPosActual = res['lng'];
          console.log(this.latPosActual);
          console.log(this.lngPosActual);
          this.calculateAndDisplayRoute(this.latPosActual, this.lngPosActual);
        })
    */

  }

  comenzarSeguimiento(){
    let options = { /*timeOut: 2000,*/ enableHighAccuracy: true };
    let watch = this.geolocation.watchPosition(options);
    watch.subscribe((data) => {
      // data can be a set of coordinates, or an error (if an error occurred).
      // data.coords.latitude
      // data.coords.longitude
        this.latPosActual =  data.coords.latitude;
        this.lngPosActual =  data.coords.longitude;
        
        console.log(data.coords);
    });
  }



  ionViewDidLoad() {


    console.log('ionViewDidLoad Pruebadist2puntosPage');
    //    this.calculateAndDisplayRoute('hola', 'hola');
    //  this.getPosicionActual();
    this.fireAuth.user.subscribe(user => {
      this.mostrarPerfilCliente(user).then(res => {
        console.log('res:');
        if (res == true) {
          this._ubicacionProv.iniciarGeoLocalizacion().then(res => {
            console.log('rta promesa:');

            this.posActual = res;

            this.latPosActual = res['lat'];
            this.lngPosActual = res['lng'];

            console.log(this.latPosActual);
            console.log(this.lngPosActual);

            //el id lo traigo del viaje, es el id del conductor
            this._ubicacionProv.inicializarConductor('a0AQRl4MqrQZcCUO818uYL2yRe12');    
            this._ubicacionProv.comenzarGeolocalizacion('a0AQRl4MqrQZcCUO818uYL2yRe12');
        
            var marker = new google.maps.Marker({
              position: new google.maps.LatLng(this.latPosActual, this.lngPosActual),
              map: map,
              scale: 1,
              title: 'aca estoy!',
              });

            this._ubicacionProv.conductor.valueChanges().subscribe( data => {
              console.log('data:');
              console.log(data);  
              this.latPosActual = data.lat;
              this.lngPosActual = data.lng;
              //this.user = data;       
        
                marker = new google.maps.Marker({
                position: new google.maps.LatLng(this.latPosActual, this.lngPosActual),
                map: map,
                scale: 1,
                title: 'aca estoy!',
                });
            })
        


            this.comenzarSeguimiento();
            //this.calculateAndDisplayRoute(this.latPosActual, this.lngPosActual);
          })

          var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 10,
            center: { lat: this.latPosActual, lng: this.lngPosActual }
          });
      
          this.addMapEventListeners();
          var directionsDisplay = new google.maps.DirectionsRenderer;

          directionsDisplay.setMap(map);

          this._ubicacionProv.metodoPrueba().subscribe(location => {
            map.panTo(location);
          })

        }
      });
    });

    this.zoom = 4;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

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
            
                this.direccionFormateada = place.formatted_address;
                this.direccion = this.direccionFormateada;
                this.myForm.value.direccion = place.formatted_address;
      
                //verify result
                if (place.geometry === undefined || place.geometry === null) {
                    return;
                }



                //set latitude, longitude and zoom
                this.latitude = place.geometry.location.lat();
                console.log(this.latitude);
                this.longitude = place.geometry.location.lng();
                console.log(this.longitude);
                this.zoom = 12;
            });
        });
    });
}

  addMapEventListeners(){
    google.maps.event.addListener()
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





  calculateAndDisplayRoute() {
    var lat = this.latPosActual;
    var lng = this.lngPosActual;
    var infoWindow;
    infoWindow = new google.maps.InfoWindow;

    var that = this;
    var directionsService = new google.maps.DirectionsService;
    var directionsDisplay = new google.maps.DirectionsRenderer;
    var map = new google.maps.Map(document.getElementById('map'), {
      zoom: 10,
      center: { lat: lat, lng: lng }
    });


    directionsDisplay.setMap(map);

    var pos = {
      lat: lat,
      lng: lng
    };



    directionsService.route({
      origin: lat + ',' + lng,
      destination: this.latitude + ',' + this.longitude,
      travelMode: 'DRIVING'
    }, function (response, status) {
      if (status === 'OK') {
        directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });
 
    var latLngActual = new google.maps.LatLng(lat, lng);
    var latLngDestino = new google.maps.LatLng(this.latitude, this.longitude);
    var s = google.maps.geometry.spherical.computeDistanceBetween(latLngActual, latLngDestino);  
    alert(s);
  }
}

 /*cargarDatosMetodo() {

    return new Promise((resolve, reject) => {

      var directionsService = new google.maps.DirectionsService();
      var directionsDisplay = new google.maps.DirectionsRenderer();
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 10,
        center: { lat: 41.85, lng: -87.65 }
      });
      var datos;
      datos[0] = directionsService;
      datos[1] = directionsDisplay;
      datos[2] = map;
      resolve(datos);
    });
  }*/

/*

  getPosicionActual() {

    return new Promise((resolve, reject) => {

      var map, infoWindow;
      map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: -34.397, lng: 150.644 },
        zoom: 10
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
          //this.posActual = pos;
        //          this.posActual['posicion'] = pos;
           //         this.posActual['map'] = map;
             //       this.posActual['infoWindow'] = infoWindow;
                  },
                  )
                }
                resolve(this.posActual);
              });
            }
          

*/