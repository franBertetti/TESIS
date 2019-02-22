import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading } from 'ionic-angular';
import { TipoVehiculoPage } from '../tipo-vehiculo/tipo-vehiculo';    
import { AngularFireAuth } from 'angularfire2/auth';
import { LoginPage } from '../../pages/login/login';
import { LocalidadPage } from '../localidad/localidad';
import { AdminConductoresPage } from '../admin-conductores/admin-conductores';
import { EstadoConductoresPage } from '../estado-conductores/estado-conductores';
import { AdminVehiculosClientePage } from '../admin-vehiculos-cliente/admin-vehiculos-cliente';
import { TipoPenalizacionPage } from '../tipo-penalizacion/tipo-penalizacion';
import { EstadoUsuarioServiceProvider } from '../../providers/estado-usuario-service/estado-usuario-service';
import { PruebadragdirPage } from '../pruebadragdir/pruebadragdir';


/**
 * Generated class for the AdministradorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-administrador',
  templateUrl: 'administrador.html',
})
export class AdministradorPage {

usuarios:any = [];
cantUsuarios:any;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl: MenuController,
              public loadingCtrl: LoadingController,
              public estadoUsuarioServicio: EstadoUsuarioServiceProvider,
              public fireAuth:AngularFireAuth) {
                this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdministradorPage');
    this.estadoUsuarioServicio.buscarEstadoConductores().then(res => {
      this.usuarios = res['usuarios'];
      this.cantUsuarios = res['cant'];  
    });
  }

  irApruebaDragDir(){
    this.navCtrl.push(PruebadragdirPage);
  }

  irATipoVehiculo(){
    this.navCtrl.push(TipoVehiculoPage);
  }

  irALocalidad(){
    this.navCtrl.push(LocalidadPage);
  }

  irAAdminConductores(){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando..',
      duration: 2000
    });
    loading.present();

      this.navCtrl.push(AdminConductoresPage, {'usuarios': this.usuarios, 'cantUsuarios': this.cantUsuarios});
  }

  irAEstadoConductores(){
    this.navCtrl.push(EstadoConductoresPage);
  }

  irAAdminVehiculosCliente(){
    this.navCtrl.push(AdminVehiculosClientePage);
  }

  irATipoPenalizaciones(){
    this.navCtrl.push(TipoPenalizacionPage);
  }

  cerrarSesion(){
      this.fireAuth.auth.signOut();
      this.navCtrl.setRoot(LoginPage);
  }
}
