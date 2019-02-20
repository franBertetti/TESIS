import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { UbicacionProvider } from '../../providers/ubicacion/ubicacion';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase, { initializeApp } from 'firebase';
import { NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Geolocation } from '@ionic-native/geolocation';
import { Subscription } from 'rxjs';

declare var google:any;
/**
 * Generated class for the Pruebadist2puntosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.s
 */

@IonicPage()
@Component({
  selector: 'page-pruebadist2puntos',
  templateUrl: 'pruebadist2puntos.html',
})
export class Pruebadist2puntosPage {

  
  rendererOptions = { draggable: true };
  map;

  constructor(public navCtrl: NavController,
    private geolocation: Geolocation,
    public navParams: NavParams,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public fireAuth: AngularFireAuth,
    public formBuilder: FormBuilder,
    public afDB: AngularFireDatabase,
    public _ubicacionProv: UbicacionProvider) {

      var rendererOptions = { draggable: true };
      var directionDisplay = new google.maps.DirectionsRenderer(rendererOptions);
      var directionsService = new google.maps.directionsService();
      var philippines = new google.maps.LatLng(13.000,122.000);

      var mapOptions = {zoom: 7, center: philippines };

      var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);

      directionDisplay.setMap(map);
      directionDisplay.setPanel(document.getElementById('directionsPanel'));

     
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PruebadistconkmPage');
        
  }

}