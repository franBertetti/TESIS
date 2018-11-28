import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatosReservaPage } from '../datos-reserva/datos-reserva';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';

/**
 * Generated class for the ResultadoBusquedaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-resultado-busqueda',
  templateUrl: 'resultado-busqueda.html',
})
export class ResultadoBusquedaPage {

  datosBusqueda: any = {};
  usuario: any = {};
  opcionesVehiculo: any = {};
  conductoresEnLinea: any = []; //array de los conductores en linea
  consulta: any = {};
  licenciasCompatibles: any = []; //array con los tipos de licencia de acuerdo al vehiculo que puso el usuario q hizo la busqueda
  datosdeUsuarioConductores: any = []; //array que tiene los datos de usuario de los conductores que coincidieron con la busqueda
  datosConductores = []; //array con la info de conductore de los conductores que coincidieron con la busqueda
  conductores: any = [];

  conductoresHabilitados: any = []; //array q trae los condcutors del tipo reserva anticipada

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    private alertCtrl: AlertController) {

    this.datosBusqueda = this.navParams.get('datosBusqueda');
    console.log("datos busqueda:");
    console.log(this.datosBusqueda);

    if (this.datosBusqueda.tipoReserva == 'ReservaInmediata'){
      this.conductoresEnLinea = this.buscarEstadoConductoresEnLinea();//obtengo los conductores en linea
    console.log("conductores en linea:");
    console.log(this.conductoresEnLinea);

    this.buscarTipoLicenciasPosiblesDeVehiculoSeleccionado(); //obtengo los tipos de licencia q pueden ser por la licencia q se ingreso

    this.traerConductoresEnLineaPorTipoLicencia();
    console.log(this.datosConductores);
    console.log(this.datosdeUsuarioConductores);
    }
    
    if (this.datosBusqueda.tipoReserva == 'ReservaAnticipada'){
    this.conductores = this.buscarConductoresHabilitados();
    }
    
  }

  buscarConductoresHabilitados(){
    return firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {
      var estadoDesdeBd = snapshot.val();
      if (estadoDesdeBd.estado == 'Aprobado' || estadoDesdeBd.estado == 'EnLinea' || estadoDesdeBd.estado == 'FueraDeLinea' || estadoDesdeBd.estado == 'Ocupado' ){
        console.log(snapshot.val());
      }
    });
    /*return firebase.database().ref('conductor/').orderByChild('estado').equalTo('EnLinea').on('child_added', (snapshot) => {

      let userRef = firebase.database().ref('usuarios/' + snapshot.key);
      this.datosConductores.push(snapshot.val());
      console.log('datos conductor:');
      console.log(snapshot.val());
      userRef.on('value', userSnap => {
        console.log(' datos usuario conductor:');
        console.log(userSnap.val()); // trae bien los datos del usuario
        this.datosUsuarioConductores.push(userSnap.val());
      });
    });

  */
  }

  traerConductoresEnLineaPorTipoLicencia() {
    this.conductoresEnLinea.on('child_added', snap => { //busco cada conductor en linea
      var opcion = snap.val();  //tomo el valor del conductor
     
      console.log(opcion.VehiculosHabilitado); //la opcion.vehiculoshabilitado contiene el array de los vehiculos q esta habilitado
      var flag = 0;
      for (var j = 0, len = opcion.VehiculosHabilitado.length; j < len; j++) {
        console.log(opcion.VehiculosHabilitado[j]);

        for (var i = 0, len = this.licenciasCompatibles.length; i < len; i++) {
          console.log(this.licenciasCompatibles[i]);
          if (opcion.VehiculosHabilitado[j] == this.licenciasCompatibles[i]) {
            //logica parte de cuando coincide la busqueda y es un conductor apto para mostrar
            var flag = 1;
            i = this.licenciasCompatibles.length;
          }

        }
        if (flag == 1) {
          var key = snap.key;
          firebase.database().ref().child('usuarios').child(key).on('value', (snapshot) => {
            console.log(snapshot.val());
            var userAGuardar = snapshot.val();
            console.log(userAGuardar.nombreCompleto);
            this.datosdeUsuarioConductores.push(userAGuardar);
            this.datosConductores.push(opcion);
          });
          
          //this.datosdeUsuarioConductores.push(userAGuardar);
          //this.datosConductores.push(opcion);

          console.log("licencias compatibles:");
          console.log(this.licenciasCompatibles);

          j = opcion.VehiculosHabilitado.length;
          flag = 0;
        }
      }
    });
  }
  



  buscarTipoLicenciasPosiblesDeVehiculoSeleccionado() {
    firebase.database().ref('vehiculoCliente/').orderByChild('nombre').equalTo(this.datosBusqueda.vehiculoReserva).on('child_added', (snapshot) => {
      var consulta = snapshot.val();
      this.licenciasCompatibles = consulta.licenciasCompatibles;

      console.log("licencias compatibles:");
      console.log(this.licenciasCompatibles);
    });
 
  }

  buscarEstadoConductoresEnLinea() {

    return firebase.database().ref('conductor/').orderByChild('estado').equalTo('EnLinea');
    /*return firebase.database().ref('conductor/').orderByChild('estado').equalTo('EnLinea').on('child_added', (snapshot) => {

      let userRef = firebase.database().ref('usuarios/' + snapshot.key);
      this.datosConductores.push(snapshot.val());
      console.log('datos conductor:');
      console.log(snapshot.val());
      userRef.on('value', userSnap => {
        console.log(' datos usuario conductor:');
        console.log(userSnap.val()); // trae bien los datos del usuario
        this.datosUsuarioConductores.push(userSnap.val());
      });
    });

  */  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad ResultadoBusquedaPage');
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));
  }

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
        });  //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
    }
  }

  confirmarConductor() {
    let alert = this.alertCtrl.create({
      title: 'Confirmar conductor',
      message: 'Esta seguro que desea confirmar la reserva?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancelar',
          handler: () => {
            console.log('Cancelar clicked');
          }
        },
        {
          text: 'Si',
          handler: () => {
            console.log('Si clicked');
            this.navCtrl.push(DatosReservaPage);
          }
        }
      ]
    });
    alert.present();
  }

}
