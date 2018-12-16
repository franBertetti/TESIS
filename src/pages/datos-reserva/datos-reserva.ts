import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireAuth } from 'angularfire2/auth';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
/**
 * Generated class for the DatosReservaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-reserva',
  templateUrl: 'datos-reserva.html',
})
export class DatosReservaPage {

  datosReserva: any;
  usuario: any;
  conductor: any;
  numeroContratacion;

  fechaActual;
  fechaActualFormateada;
  horaActual;

  viaje: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public fireAuth: AngularFireAuth,
    public afDB: AngularFireDatabase,
    public usuarioService: UsuarioServicioProvider) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

    this.getFechaActualFormateada();
    this.datosReserva = this.navParams.get('datosReserva');
    this.usuario = this.navParams.get('usuario');
    this.conductor = this.navParams.get('conductor');
    this.numeroContratacion = Date.now();/*para generar un id */
    console.log(this.numeroContratacion);
    console.log(this.datosReserva);
    console.log(this.usuario);
    console.log(this.usuario.id);
    console.log(this.conductor);
    console.log(this.conductor.id);
    this.fechaActual = new Date();

    this.guardarViajeEnBd();

  }

  public guardarViajeEnBd() {
    this.viaje.idUsuario = this.usuario.id;
    this.viaje.idConductor = this.conductor.id;
    this.viaje.nombreConductor = this.conductor.nombreCompleto;
    this.viaje.nombreCliente = this.usuario.nombreCompleto;
    this.viaje.numeroContratacion = this.numeroContratacion;
    this.viaje.fecha = this.fechaActualFormateada;
    this.viaje.hora = this.horaActual;
    this.viaje.direccionDeBusqueda = this.datosReserva.direccion;
    this.viaje.vehiculoReserva = this.datosReserva.vehiculoReserva;
    this.viaje.tipoContratacion = this.datosReserva.tipoReserva;
    this.viaje.estado = 'Conductor yendo a la ubicación';

    this.afDB.database.ref('conductor/' + this.conductor.id + '/estado').set('Ocupado');
    if (this.datosReserva.tipoReserva == 'ReservaAnticipada') {
      //this.viaje.idReservaAnticipada = "idDeLaReserva";
      //datos de la reserva en caso de ser anticipada
    }
    this.afDB.database.ref('viaje/' + this.numeroContratacion).set(this.viaje);
  }

  public getFechaActualFormateada() {
    var dateObj = new Date();
    var año = dateObj.getFullYear().toString();
    var mes = dateObj.getMonth().toString();
    var dia = dateObj.getDate().toString();

    var hora = dateObj.getHours().toString();
    if (hora == '1' || hora == '2' || hora == '3' || hora == '4' || hora == '5' || hora == '6' || hora == '7' || hora == '8' || hora == '9') {
      hora = '0' + hora;
    }
    var minutos = dateObj.getMinutes().toString();
    if (minutos == '1' || minutos == '2' || minutos == '3' || minutos == '4' || minutos == '5' || minutos == '6' || minutos == '7' || minutos == '8' || minutos == '9') {
      minutos = '0' + minutos;
    }
    var segundos = dateObj.getSeconds().toString();
    if (segundos == '1' || segundos == '2' || segundos == '3' || segundos == '4' || segundos == '5' || segundos == '6' || segundos == '7' || segundos == '8' || segundos == '9') {
      segundos = '0' + segundos;
    }
    var arrayMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    this.fechaActualFormateada = dia + ' de ' + arrayMeses[mes] + ' de ' + año;
    this.horaActual = hora + ':' + minutos + ':' + segundos;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosReservaPage');
  }

  iraPerfilCliente() {
    this.navCtrl.setRoot(PerfilClientePage);
  }
}
