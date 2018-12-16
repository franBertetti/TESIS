import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { ResultadoBusquedaPage } from '../resultado-busqueda/resultado-busqueda';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  mensaje;
  faltaTipoVehiculo: boolean;
  faltaDireccion: boolean;
  usuario;

  btnInmediato = true;
  btnAnticipado = false;

  myFormInmediato: FormGroup;
  myFormAnticipado: FormGroup;

  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public fireAuth: AngularFireAuth,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para activar el menu desplegable en esta pagina
    this.today = new Date().toISOString();

    this.getTipoVehiculo()
      .valueChanges().subscribe(TipoVehiculoGuardados => {
        console.log(TipoVehiculoGuardados)
        this.TipoVehiculos = TipoVehiculoGuardados;
        //this.nombre = this.usuario.nombreCompleto;

      });

      this.busqueda.tipoReserva = 'ReservaInmediata'; 

      this.myFormInmediato = this.formBuilder.group({
      vehiculoReserva: ['', Validators.required],
      direccion: ['', Validators.required]
    });

    this.myFormAnticipado = this.formBuilder.group({
      vehiculoReserva: ['', Validators.required],
      direccion: ['', Validators.required],
      horaBusqueda: ['', Validators.required],
      DiaBusqueda: ['', Validators.required]
    });


  }

  reservaInmediata(id) {
    this.btnInmediato = true;
    this.btnAnticipado = false;
    this.busqueda.tipoReserva = 'ReservaInmediata';
  }


  reservaAnticipada(id) {
    this.btnInmediato = false;
    this.btnAnticipado = true;
    this.busqueda.tipoReserva = 'ReservaAnticipada';
  }


  public getTipoVehiculo() {
    return this.afDB.list('vehiculoCliente/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RealizarReservaPage');
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));
  }

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
        });

    }

  }


  buscarConductores() {

    /*
    if (!this.busqueda.horaBusqueda)

      if (this.busqueda.direccion) {
        this.faltaDireccion = false;
      } else {
        this.faltaDireccion = true;
      }

    console.log(this.faltaDireccion);

    if (this.busqueda.vehiculoReserva) {
      this.faltaTipoVehiculo = false;
    } else {
      this.faltaTipoVehiculo = true;
    }

    console.log(this.faltaTipoVehiculo);

    if (this.faltaDireccion == true && this.faltaTipoVehiculo == true) {
      this.mensaje = 'Por favor, ingrese el Tipo de vehiculo y la Direccion';
    } else if (this.faltaDireccion == true) {
      this.mensaje = 'Por favor, ingrese la Dirección';
    } else if (this.faltaTipoVehiculo == true) {
      this.mensaje = 'Por favor, ingrese el Tipo de vehiculo';
    }

    if (this.faltaDireccion == true || this.faltaTipoVehiculo == true) {
      let alert = this.alertCtrl.create({
        message: this.mensaje,
        buttons: [
          {
            text: "Ok",
            role: 'cancel'
          }
        ]
      });
      alert.present();
    }*/

  //  if (this.faltaDireccion == false && this.faltaTipoVehiculo == false) {

      console.log(this.busqueda.direccion);
      console.log(this.busqueda);

      let alert = this.alertCtrl.create({
        title: '¿ Buscar Conductores ? ',
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


let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Buscando Conductores',
        duration: 3500
      });

      loading.onDidDismiss(() => {
        console.log('Dismissed loading');
      });

      loading.present();

      this.busqueda.idCliente = this.usuario.id;

      this.navCtrl.push(ResultadoBusquedaPage, { 'datosBusqueda': this.busqueda });

            }
          }
        ]
      });
      alert.present();

      
    //}
  }

}
