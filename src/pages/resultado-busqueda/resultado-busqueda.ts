import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatosReservaPage } from '../datos-reserva/datos-reserva';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { DetalleConductorPage } from '../detalle-conductor/detalle-conductor';
import { ServicioBusquedaConductoresProvider } from '../../providers/servicio-busqueda-conductores/servicio-busqueda-conductores';
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
  conductores: any = []; //array con los conductores q pueden ser mostrados para busqueda anticipada
  idConductores: any = []; //array con los id de los conductores q pueden ser llamados para busqueda anticipada
  conductoresHabilitados: any = []; //array q trae los condcutors del tipo reserva anticipada
  todoJunto: any = [];

  idConductorSeleccionado: any;

  rows = [
    {
      "name": "Ethel Price",
      "gender": "female",
      "age": 22
    },
    {
      "name": "Claudine Neaassaddsl",
      "gender": "female",
      "age": 55
    },
    {
      "name": "Beryl Rice",
      "gender": "male",
      "age": 28
    }
  ];

  tablestyle = 'bootstrap';
  id;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    public usuarioServicio: UsuarioServicioProvider,
    public servicioBusquedaConductores: ServicioBusquedaConductoresProvider,
    private alertCtrl: AlertController) {

    this.datosBusqueda = this.navParams.get('datosBusqueda');
    this.id = this.navParams.get('id');
    console.log("datos busqueda:");
    console.log(this.datosBusqueda);

    this.servicioBusquedaConductores.setDatosBusqueda(this.datosBusqueda);

    if (this.datosBusqueda.tipoReserva == 'ReservaInmediata') {
      this.conductoresEnLinea = this.buscarEstadoConductoresEnLinea();//obtengo los conductores en linea
      console.log("conductores en linea:");
      console.log(this.conductoresEnLinea);

      this.buscarTipoLicenciasPosiblesDeVehiculoSeleccionado(); //obtengo los tipos de licencia q pueden ser por la licencia q se ingreso

      this.traerConductoresEnLineaPorTipoLicencia();
      console.log(this.datosConductores);
      console.log(this.datosdeUsuarioConductores);
    }
    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => { });
    usuarioServicio.changeMessage('asda');

    if (this.datosBusqueda.tipoReserva == 'ReservaAnticipada') {
      var a = this.buscarConductoresHabilitados();
      if (a == 'a') {
        for (var i = 0, len = this.conductores.length; i < len; i++) {
          console.log(this.conductores[i]);
        }
      }
      console.log(this.conductores);

      this.buscarTipoLicenciasPosiblesDeVehiculoSeleccionado(); //obtengo los tipos de licencia q pueden ser por la licencia q se ingreso
      this.traerConductoresReservaAnticipadaPorTipoLicencia();
    }
    usuarioServicio.changeMessage('asda');

    usuarioServicio.currentMesagge.subscribe(message => { });
    usuarioServicio.changeMessage('asda');


  }

  buscarConductoresHabilitados() {
    firebase.database().ref('conductor/').orderByChild('estado').once('child_added', (snapshot) => {
      var estadoDesdeBd = snapshot.val();
      if (estadoDesdeBd.estado == 'Aprobado' || estadoDesdeBd.estado == 'EnLinea' || estadoDesdeBd.estado == 'FueraDeLinea' || estadoDesdeBd.estado == 'Ocupado') {
        console.log(snapshot.val());
        this.conductores.push(estadoDesdeBd);
        this.idConductores.push(snapshot.key);
      }
    });
    return 'a';
  }

  traerConductoresReservaAnticipadaPorTipoLicencia() {

    for (var q = 0, len = this.conductores.length; q < len; q++) {
      var opcion = this.conductores[q];

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
          var key = this.idConductores[q];
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
    };
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

            console.log("licencias compatibles:");
            console.log(this.licenciasCompatibles);

            j = opcion.VehiculosHabilitado.length;
            flag = 0;
          }
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
    /*return firebase.database() .ref('conductor/').orderByChild('estado').equalTo('EnLinea').on('child_added', (snapshot) => {

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
    if (this.idConductorSeleccionado == undefined) {
      let alert = this.alertCtrl.create({
        title: 'No selecciono conductor',
        message: 'Por favor, seleccione un conductor',
        buttons: [
          {
            text: 'Aceptar',
            role: 'cancelar',
            handler: () => {
              console.log('Cancelar clicked');
            }
          }
        ]
      });
      alert.present();
    } else {
      let alert = this.alertCtrl.create({
        title: 'Confirmar conductor',
        message: '¿Desea confirmar la reserva?',
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
              this.navCtrl.setRoot(DatosReservaPage, { 'datosReserva': this.datosBusqueda, 'usuario': this.usuario, 'conductor': this.idConductorSeleccionado });
            }
          }
        ]
      });
      alert.present();
    }
  }

  isSelected(idConductorSeleccionado): boolean {
    if (!this.idConductorSeleccionado) {
      return false;
    }
    return this.idConductorSeleccionado === idConductorSeleccionado ? true : false;
  }

  setIdConductorSeleccionado(id) {
    this.afDB.object('usuarios/' + id)
      .valueChanges().subscribe(usuarioGuardado => {
        this.idConductorSeleccionado = usuarioGuardado;
      });
  }

  irADetalleConductor(id) {
    this.navCtrl.push(DetalleConductorPage, { 'id': id });
  }

  switchStyle() {
    if (this.tablestyle == 'dark') {
      this.tablestyle = 'bootstrap';
    } else {
      this.tablestyle = 'dark';
    }
  }

  /*  getRowClass(row){
      return row.gender == 'male' ? 'male-row' : 'female-row';
    }
  
    open(row){
      let alert = this.alertCtrl.create({
        title: 'row',
        message: `${row.name} is ${row.age} years old!`,
        buttons: ['OK']
      });
      alert.present();
    }
    */
}
