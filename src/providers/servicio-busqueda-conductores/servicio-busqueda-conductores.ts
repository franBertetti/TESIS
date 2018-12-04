import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from 'angularfire2/database';

/*
  Generated class for the ServicioBusquedaConductoresProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class ServicioBusquedaConductoresProvider {

  licenciasCompatibles: any = [];
  datosDeUsuarioConductores: any = [];
  datosConductores: any = [];

  datosDelConductor: any = [];
  infoDelConductor: any = [];

  private objetoDeServicio = new BehaviorSubject({infoDelConductor: 'nuse', datosDelConductor: ' velo'});
  objetoInfoConductor = this.objetoDeServicio.asObservable();

  constructor(
    public http: HttpClient,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth) {
    console.log('Hello ServicioBusquedaConductoresProvider Provider');
  }

  public setDatosBusqueda(datosBusqueda) {
    if (datosBusqueda.tipoReserva == 'ReservaInmediata') {
      this.obtenerConductoresReservaInmediata(datosBusqueda);
    }
    if (datosBusqueda.tipoReserva == 'ReservaAnticipada') {
      this.obtenerConductoresReservaAnticipada(datosBusqueda);
    }
  }
  
  public obtenerConductoresReservaAnticipada(datosBusqueda){

  }


  public obtenerConductoresReservaInmediata(datosBusqueda) {
    var conductores = this.buscarConductoresEnLinea();
    var consultaLicencias = this.buscarTipoLicenciasPosiblesDeVehiculoSeleccionado(datosBusqueda);
    consultaLicencias.once('child_added', snapshot => {
      this.licenciasCompatibles = snapshot.val().licenciasCompatibles;
    });
    conductores.once('child_added', snap => {
      var esConductorValido = this.verificarSiEsConductorParaMostrar(snap.val(), this.licenciasCompatibles);
      if (esConductorValido == true) { 
        firebase.database().ref().child('usuarios').child(snap.key).on('value', (snapshot) => {
          this.datosDeUsuarioConductores.push(snapshot.val());
          this.datosConductores.push(snap.val());
        });
      }
    });
  
    this.datosDelConductor = this.datosConductores;
    this.infoDelConductor = this.datosDeUsuarioConductores;
    console.log(this.datosDelConductor);
    console.log(this.infoDelConductor);
  }

  public verificarSiEsConductorParaMostrar(conductor, licenciasCompatibles) {
    for (var j = 0, len = conductor.VehiculosHabilitado.length; j < len; j++) {
      console.log(conductor.VehiculosHabilitado[j]);

      for (var i = 0, len = licenciasCompatibles.length; i < len; i++) {
        console.log(licenciasCompatibles[i]);
        if (conductor.VehiculosHabilitado[j] == licenciasCompatibles[i]) {
          //logica parte de cuando coincide la busqueda y es un conductor apto para mostrar
          return true;
        }
        if (j == conductor.VehiculosHabilitado.length - 1) {
          return false
        };

      }
    }
  }

  public buscarConductoresEnLinea() {
    return firebase.database().ref('conductor/').orderByChild('estado').equalTo('EnLinea');
  }

  buscarTipoLicenciasPosiblesDeVehiculoSeleccionado(datosBusqueda) {
    return firebase.database().ref('vehiculoCliente/').orderByChild('nombre').equalTo(datosBusqueda.vehiculoReserva);
  }

}
