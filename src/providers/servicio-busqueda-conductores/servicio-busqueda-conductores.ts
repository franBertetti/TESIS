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
import { convertDataToISO } from 'ionic-angular/umd/util/datetime-util';

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

  private objetoDeServicio = new BehaviorSubject({ infoDelConductor: 'nuse', datosDelConductor: ' velo' });
  objetoInfoConductor = this.objetoDeServicio.asObservable();



  datosBusqueda;
  conductores;
  datosdeUsuarioConductores: any = [];



  constructor(
    public http: HttpClient,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth) {
    console.log('Hello ServicioBusquedaConductoresProvider Provider');
  }

  public setDatosBusqueda(datosBusqueda) {
    this.datosBusqueda = datosBusqueda;
    console.log(this.datosBusqueda);
  }

  public obtenerConductoresReservaAnticipada(datosBusqueda) {

  }


  public obtenerConductoresReservaInmediata(datosBusqueda) {
    var conductores = this.buscarConductoresEnLinea();
    var consultaLicencias = this.buscarTipoLicenciasPosiblesDeVehiculoSeleccionado();
    /*     consultaLicencias.once('child_added', snapshot => {
        this.licenciasCompatibles = snapshot.val().licenciasCompatibles;
      });
  /*    conductores.once('child_added', snap => {
        var esConductorValido = this.verificarSiEsConductorParaMostrar(snap.val(), this.licenciasCompatibles);
        if (esConductorValido == true) { 
          firebase.database().ref().child('usuarios').child(snap.key).on('value', (snapshot) => {
            this.datosDeUsuarioConductores.push(snapshot.val());
            this.datosConductores.push(snap.val());
          });
        }
      });*/

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
    return new Promise((resolve, reject) => {

      var conductoresEnLinea: any = [];
      firebase.database().ref('conductor/').orderByChild('estado').equalTo('EnLinea').on('child_added', snap => {
        var v = snap.val();
        v.key = snap.key;
        conductoresEnLinea.push(v);
      });

      /*      console.log('cond get cond:');
            console.log(conductoresEnLinea);*/

      resolve(conductoresEnLinea);
    });
  }

  buscarTipoLicenciasPosiblesDeVehiculoSeleccionado() {


    return new Promise((resolve, reject) => {

      var licenciasCompatibles: any = [];
      firebase.database().ref('vehiculoCliente/').orderByChild('nombre').equalTo(this.datosBusqueda.vehiculoReserva).on('child_added', snap => {
        licenciasCompatibles.push(snap.val());
      });
      resolve(licenciasCompatibles);
    })
  }

  getConductoresReservaInmediata() {

    return new Promise((resolve, reject) => {

/*      this.buscarConductoresEnLinea().then(rta => {
        this.conductores = rta;
        console.log('cond get cond:');
        console.log(this.conductores);
        var cond = this.conductores;

        this.buscarTipoLicenciasPosiblesDeVehiculoSeleccionado().then(rta => {
          this.licenciasCompatibles = rta;
          console.log('CONSULTA LICENCIAS:');
          console.log(this.licenciasCompatibles);
          var lic = this.licenciasCompatibles;
          this.traerConductoresEnLineaPorTipoLicencia(cond,lic).then(rta => {

            console.log(rta);
            if (rta == true) {
              resolve({ 'datosDeUsuarioConductores': this.datosdeUsuarioConductores, 'datosConductores': this.datosConductores });
            }
          })

        })


      })
*/
      //resolve(false);
    });

  }


  traerConductoresEnLineaPorTipoLicencia(cond, lic) {

    return new Promise((resolve, reject) => {

      var conductores = cond;
      var licenciasCompatibles = lic;
      for (var l = 0, len = conductores.VehiculosHabilitado.length; l < len; l++) {
        var opcion = conductores[l];
        console.log(opcion.VehiculosHabilitado); //la opcion.vehiculoshabilitado contiene el array de los vehiculos q esta habilitado
        var flag = 0;
        for (var j = 0, len = opcion.VehiculosHabilitado.length; j < len; j++) {
          console.log(opcion.VehiculosHabilitado[j]);

          for (var i = 0, len = licenciasCompatibles.length; i < len; i++) {
            console.log(licenciasCompatibles[i]);
            if (opcion.VehiculosHabilitado[j] == licenciasCompatibles[i]) {
              //logica parte de cuando coincide la busqueda y es un conductor apto para mostrar
              var flag = 1;
              i = licenciasCompatibles.length;
            }

          }
          if (flag == 1) {
            var key = opcion.key;
            if (key != this.datosBusqueda.idCliente) {
              firebase.database().ref().child('usuarios').child(key).on('value', (snapshot) => {
                console.log(snapshot.val());
                var userAGuardar = snapshot.val();
                console.log(userAGuardar.nombreCompleto);
                opcion.direccion = userAGuardar.direccion;
                opcion.dni = userAGuardar.dni;
                opcion.email = userAGuardar.email;
                opcion.fechaNacimiento = userAGuardar.fechaNacimiento;
                opcion.id = userAGuardar.id;
                opcion.localidad = userAGuardar.localidad;
                opcion.nombreCompleto = userAGuardar.nombreCompleto;
                opcion.numCelular = userAGuardar.numCelular;
                opcion.numDepto = userAGuardar.numDepto;
                opcion.numPiso = userAGuardar.numPiso;
                firebase.storage().ref('FotosUsuario/' + opcion.id + '/fotoPerfil.png').getDownloadURL().then((url) => {
                  opcion.fotoPerfil = url;
                });
                this.datosdeUsuarioConductores.push(userAGuardar);
                this.datosConductores.push(opcion);
              });

              //this.datosdeUsuarioConductores.push(userAGuardar);
              //this.datosConductores.push(opcion);
              //
              console.log("licencias compatibles:");
              console.log(this.licenciasCompatibles);

              j = opcion.VehiculosHabilitado.length;
              flag = 0;
            }
          }
        }
      }
      resolve({ 'datosUsCond': this.datosdeUsuarioConductores, 'datosCond': this.datosConductores });
    })
  }



  getConductoresReservaAnticipada() { }




}
