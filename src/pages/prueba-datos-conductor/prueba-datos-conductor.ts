import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ServicioBusquedaConductoresProvider } from '../../providers/servicio-busqueda-conductores/servicio-busqueda-conductores';

/**
 * Generated class for the PruebaDatosConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-prueba-datos-conductor',
  templateUrl: 'prueba-datos-conductor.html',
})
export class PruebaDatosConductorPage {


  datosBusqueda: any = {direccion: 'Villa Gesell 215, Villa Nueva, Córdoba, Argentina',
                        idCliente: 'a0AQRl4MqrQZcCUO818uYL2yRe12',
                          latitud: -32.425649299999996,                          
                         longitud: -63.260050899999996,
                        tipoReserva: 'ReservaInmediata',
                        vehiculoReserva: 'Automovil'}


  constructor(public navCtrl: NavController, public navParams: NavParams, public _servConductores: ServicioBusquedaConductoresProvider) {
  
    this._servConductores.setDatosBusqueda(this.datosBusqueda);
    this._servConductores.getConductoresReservaInmediata().then(res => {
      console.log(res);
      
    })

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PruebaDatosConductorPage');
  }

}
