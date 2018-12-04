import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';

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

  datosReserva:any;
  usuario:any;
  conductor:any;
  numeroContratacion;

  fechaActual;
  fechaActualFormateada;
  horaActual;
  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl:MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
    this.datosReserva = this.navParams.get('datosReserva');
    this.usuario = this.navParams.get('usuario');
    this.conductor = this.navParams.get('conductor'); 
    this.numeroContratacion = Date.now();/*para generar un id */
    console.log(this.numeroContratacion);
    console.log(this.datosReserva);
    console.log(this.usuario);
    console.log(this.conductor);
    this.fechaActual = new Date();
    this.getFechaActualFormateada();
  }

  public getFechaActualFormateada(){
    var dateObj = new Date();
    var año = dateObj.getFullYear().toString();
    var mes = dateObj.getMonth().toString();
    var dia = dateObj.getDay().toString();
    var hora = dateObj.getHours().toString();
    if (hora == '1' || hora == '2' || hora == '3' || hora == '4' || hora == '5' || hora == '6' || hora == '7' || hora == '8' || hora == '9'){
      hora = '0'+hora;
    }
    var minutos = dateObj.getMinutes().toString();
    if (minutos == '1' || minutos == '2' || minutos == '3' || minutos == '4' || minutos == '5' || minutos == '6' || minutos == '7' || minutos == '8' || minutos == '9'){
      minutos = '0'+minutos;
    }
    var segundos = dateObj.getSeconds().toString();
    if (segundos == '1' || segundos == '2' || segundos == '3' || segundos == '4' || segundos == '5' || segundos == '6' || segundos== '7' || segundos == '8' || segundos == '9'){
      segundos = '0'+segundos;
    }
    var arrayMeses = ['Enero','Febrero','Marzo','Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre','Octubre', 'Noviembre', 'Diciembre'];
    this.fechaActualFormateada = dia + ' de ' + arrayMeses[mes] +' de '+ año;
    var currentMinute = new Date().getMinutes();
    this.horaActual = hora+':'+minutos+':'+segundos; 
    ;
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosReservaPage');
  }

  iraPerfilCliente(){
    this.navCtrl.setRoot(PerfilClientePage);
  }
}
