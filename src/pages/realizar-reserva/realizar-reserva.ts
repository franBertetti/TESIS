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
 * Generated class for the RealizarReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-realizar-reserva',
  templateUrl: 'realizar-reserva.html',
})
export class RealizarReservaPage {
  //variables del geocodificacion inversa
  geocoder;
  map;
  infowindow;
  latilng;

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

  myFormInmediato: FormGroup;
  myFormAnticipado: FormGroup;

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
      console.log(res);
      /*console.log(this.geolocalizacion);
      console.log(this.geolocalizacion.coords);*/
      this.geolocalizacion.latitud = this.geolocalizacion.coords.latitude;
      this.geolocalizacion.longitud = this.geolocalizacion.coords.longitude;
      console.log(this.geolocalizacion.latitud);
      console.log(this.geolocalizacion.longitud);

     /* this._ubicacionProv.getDireccionActual(this.geolocalizacion.latitud, this.geolocalizacion)
        .then(res => {
          var s = res;
          console.log(s);
        })*/
    })

    this.getTipoVehiculo()
      .valueChanges().subscribe(TipoVehiculoGuardados => {
        console.log(TipoVehiculoGuardados)
        this.TipoVehiculos = TipoVehiculoGuardados;
        //this.nombre = this.usuario.nombreCompleto;

      });

    this.busqueda.tipoReserva = 'ReservaInmediata';

    this.myFormInmediato = this.formBuilder.group({
      vehiculoReserva: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.myFormAnticipado = this.formBuilder.group({
      vehiculoReserva: ['', Validators.required],
      direccion: ['', Validators.required],
      horaBusqueda: ['', Validators.required],
      DiaBusqueda: ['', Validators.required]
    });


  }

  reservaInmediata(id) {
    this.btnInmediato = true;
    this.btnAnticipado = false;
    this.busqueda.tipoReserva = 'ReservaInmediata';
  }


  reservaAnticipada(id) {
    this.btnInmediato = false;
    this.btnAnticipado = true;
    this.busqueda.tipoReserva = 'ReservaAnticipada';
  }


  public getTipoVehiculo() {
    return this.afDB.list('vehiculoCliente/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarReservaPage');
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));

    this.zoom = 15;
    this.latitude = 39.8282;
    this.longitude = -98.5795;


    //create search FormControl
    this.searchControl = new FormControl();

    this.setCurrentPosition();

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

          console.log(place.formatted_address);
          this.direccionFormateada = place.formatted_address;
          this.busqueda.direccion = this.direccionFormateada;
          console.log('localidad:');
          this.localidadFormateada = place.vicinity;
          this.usuario.localidad = this.localidadFormateada;

          var divisiones = place.formatted_address.split(",", length);
          //console.log(divisiones);
          console.log("provincia:");
          console.log(divisiones[2]);
          this.provinciaFormateada = divisiones[2].trim();
          this.usuario.provincia = this.provinciaFormateada;

          //verify result
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

  
    this.initMap();
  
  }

  initMap() {
    this.map = new google.maps.Map(document.getElementById('map'), {
      zoom: 8,
      center: { lat: 40.731, lng: -73.997 }
    });
    this.geocoder = new google.maps.Geocoder;
    this.infowindow = new google.maps.InfoWindow; 
    this.geocodeLatLng('-32.4027606,-63.2415736');
  }


  geocodeLatLng(latitudlongitud) {
    var input = latitudlongitud;
    var latlngStr = input.split(',', 2);
    var latlng = {lat: parseFloat(latlngStr[0]), lng: parseFloat(latlngStr[1])};
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
          this.busqueda.direccion = results[0].formatted_address;          
          this.infowindow.open(this.map, marker);
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }


  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
        });

    }

  }


  buscarConductores() {

    /*
    if (!this.busqueda.horaBusqueda)

      if (this.busqueda.direccion) {
        this.faltaDireccion = false;
      } else {
        this.faltaDireccion = true;
      }

    console.log(this.faltaDireccion);

    if (this.busqueda.vehiculoReserva) {
      this.faltaTipoVehiculo = false;
    } else {
      this.faltaTipoVehiculo = true;
    }

    console.log(this.faltaTipoVehiculo);

    if (this.faltaDireccion == true && this.faltaTipoVehiculo == true) {
      this.mensaje = 'Por favor, ingrese el Tipo de vehiculo y la Direccion';
    } else if (this.faltaDireccion == true) {
      this.mensaje = 'Por favor, ingrese la Dirección';
    } else if (this.faltaTipoVehiculo == true) {
      this.mensaje = 'Por favor, ingrese el Tipo de vehiculo';
    }

    if (this.faltaDireccion == true || this.faltaTipoVehiculo == true) {
      let alert = this.alertCtrl.create({
        message: this.mensaje,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }*/

    //  if (this.faltaDireccion == false && this.faltaTipoVehiculo == false) {

    console.log(this.busqueda.direccion);
    console.log(this.busqueda);

    let alert = this.alertCtrl.create({
      title: '¿ Buscar Conductores ? ',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Confirmar',
          handler: () => {
            console.log('Si clicked');


            let loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Buscando Conductores',
              duration: 3500
            });

            loading.onDidDismiss(() => {
              console.log('Dismissed loading');
            });

            loading.present();

            this.busqueda.idCliente = this.usuario.id;

            this.navCtrl.push(ResultadoBusquedaPage, { 'datosBusqueda': this.busqueda });

          }
        }
      ]
    });
    alert.present();


  }

}
