import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { Geolocation } from '@ionic-native/geolocation';
import { LoadingController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import firebase from 'firebase';
import { NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

declare var google: any;

/*
  Generated class for the DireccionBusquedaProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class DireccionBusquedaProvider {



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

  mostrarBtnFinalizarViaje:boolean = true;

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
  viaje:any = {};
  costoConductor;
  datosConductor;
  totalViaje:number;

  contTotal:boolean = false;

  constructor(
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public _ubicacionProv: UbicacionProvider,
    private geolocation: Geolocation,
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public menuCtrl: MenuController,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {}


  initMap(dirDestino) {

    //this.map.setCenter(this.posActual);

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
    if (this.mostrarBtnFinalizarViaje == true){
    this.total = total;
    this.totalViaje = Math.trunc(this.total*this.costoConductor);
      this.contTotal = true;
  }
  }




}
