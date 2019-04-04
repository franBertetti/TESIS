import { Component, OnDestroy } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ResultadoBusquedaPage } from '../resultado-busqueda/resultado-busqueda';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { LoginPage } from '../login/login';
import { FinalViajePage } from '../final-viaje/final-viaje';

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
export class PruebadragdirPage implements OnInit, OnDestroy {
  //declaraciones autocompletar

  esOculto: boolean = true;

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  direccionFormateada;
  localidadFormateada;
  provinciaFormateada;

  @ViewChild("search")
  public searchElementRef;

  mostrarBotonViaje: boolean = false;

  mostrarIndicaciones: boolean = false;

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
  latPosActual;
  lngPosActual;
  posActual;
  esFinViaje: boolean = false;

  mostrarBtnFinalizarViaje: boolean = true;

  total: number;

  comenzoViaje: boolean = false;

  map: any;
  directionsService: any;
  directionsDisplay: any;
  watch: any;
  marker: any;

  marker1: any;
  marker2: any;
  markerPar: boolean = true;
  markerImpar: boolean = false;
  load;
  viaje: any = {};
  costoConductor;
  datosConductor;
  totalViaje: number;
  subscription: any;
  contTotal: boolean = false;
  contador = 0;

  constructor(public navCtrl: NavController,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public navParams: NavParams,
    public _ubicacionProv: UbicacionProvider,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

      this.viaje = this.navParams.get('viaje');
      console.log(this.viaje);
    firebase.database().ref('conductor/').orderByChild('id').equalTo(this.viaje.idConductor).on('child_added', snap => {
      var valor = snap.val();
      console.log('valor:');
      console.log(valor);
      this.costoConductor = valor.tarifa;
      this.latPosActual = valor.latitud;
      this.lngPosActual = valor.longitud;
      this.posActual = this.latPosActual + ',' + this.lngPosActual;
    });

    this.myForm = this.formBuilder.group({
      direccion: ['', Validators.required]
    });


    /*    this.watch = this.geolocation.watchPosition();
        this.watch.subscribe((data) => {
    
          this.latPosActual = data.coords.latitude;
          this.lngPosActual = data.coords.longitude;
          this.posActual = this.latPosActual + ',' + this.lngPosActual;
          console.log(this.posActual);
        });*/

  }


  ngOnInit() {
    this.watch = this.geolocation.watchPosition();
    this.subscription = this.watch.subscribe((data) => {

      this.latPosActual = data.coords.latitude;
      this.lngPosActual = data.coords.longitude;
      this.posActual = this.latPosActual + ',' + this.lngPosActual;
      console.log(this.posActual);
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  finalizarViaje() {
    this.navCtrl.setRoot(LoginPage);
  }

  ionViewDidLoad() {

    if (this.directionsDisplay != null) {
      this.directionsDisplay.setMap(null);
      this.directionsDisplay = null;
    }

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
      //      this.initMap();

    })

  }

  initMap(dirDestino) {

    this.directionsDisplay.addListener('directions_changed', () => {
      this.computeTotalDistance(this.directionsDisplay.getDirections());
      var result = this.directionsDisplay.getDirections();
      this.computeTotalDistance(result);
    });
    this.displayRoute(this.posActual, dirDestino, this.directionsService,
      this.directionsDisplay);


  }

  abrir() {
    alert(this.total);
  }

  displayRoute(origin, destination, service, display) {
    if (this.contador != 2) {
      service.route({
        origin: origin,
        destination: destination,
        travelMode: 'DRIVING'
      }, function (response, status) {
        if (status === 'OK') {
          display.setDirections(response);
        }
        else {
          alert('Could not display directions due to: ' + status);
        }
      });
    }
  }


  computeTotalDistance(result) {
    if (this.contador != 2) {
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
      if (result.routes['0'].legs['0'].distance.value < 50) {
        this.watch = [];
        this.contador = 2;
        var cargando = this.loadingCtrl.create({
          spinner: 'crescent',
          content: 'Llegando a destino..',
          duration: 3000
        });
        cargando.present();
        setTimeout(() => {
          this.navCtrl.setRoot(FinalViajePage, { 'viaje': this.viaje });
        }, 3000);
      }
      if (this.contador == 0) {
        for (var i = 0; i < myroute.legs.length; i++) {
          total += myroute.legs[i].distance.value;
        }
        ;
        total = total / 1000;
        document.getElementById('total').innerHTML = total + ' km';
        if (this.mostrarBtnFinalizarViaje == true) {
          this.total = total;
          this.totalViaje = Math.trunc(this.total * this.costoConductor);
          this.contTotal = true;
          this.contador = 1;
        }
      }
    }
  }


  calcularViaje() {
    this.initMap(this.direccionFormateada);
    this.mostrarBotonViaje = true;
    this.esOculto = false;

    this.load = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 2000
    });
    this.load.present();
  }

  ComenzarViaje() {
    this.viaje.direccionDestino = this.direccionFormateada;
    this.viaje.latitudDireccionDestino = this.latitude;
    this.viaje.longitudDireccionDestino = this.longitude;
    this.mostrarBtnFinalizarViaje = false;
    this.comenzoViaje = true;
    this.mostrarIndicaciones = true;
    this.load = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 2000
    });
    this.load.present();
  };


}
