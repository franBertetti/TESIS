import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ResultadoBusquedaPage } from '../resultado-busqueda/resultado-busqueda';
import { AngularFireDatabase } from 'angularfire2/database';
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
  today;
  TipoVehiculos = [];
  busqueda: any = {};
  tipoReserva: boolean = false;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public afDB: AngularFireDatabase,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para activar el menu desplegable en esta pagina
    this.today = new Date().toISOString();

    this.getTipoVehiculo()
      .valueChanges().subscribe(TipoVehiculoGuardados => {
        console.log(TipoVehiculoGuardados)
        this.TipoVehiculos = TipoVehiculoGuardados;
        //this.nombre = this.usuario.nombreCompleto;

      });

  }

  //s
  
  public getTipoVehiculo() {
    return this.afDB.list('vehiculoCliente/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarReservaPage');
  }

  buscarConductores() {

    if (this.tipoReserva == true) {
      this.busqueda.tipoReserva = 'ReservaAnticipada';
    } else {
      this.busqueda.tipoReserva = 'ReservaInmediata';
    }

    console.log(this.busqueda.direccion);
    console.log(this.busqueda);

    this.navCtrl.push(ResultadoBusquedaPage, {'datosBusqueda': this.busqueda} );
  }
}
