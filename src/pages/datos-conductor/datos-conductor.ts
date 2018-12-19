import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
/**
 * Generated class for the DatosConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-conductor',
  templateUrl: 'datos-conductor.html',
})
export class DatosConductorPage {

  usuario: any = {};
  conductor: any = {};
  flag = false;
  isDisabled: boolean = true;
  myForm: FormGroup;
  noGuardar: boolean;
  TipoVehiculos = [];
  fotoCarnet: any;
  fotoDni: any;
  perfilDni: any;
  perfilCarnet: any;
  id;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public afDB: AngularFireDatabase,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public fireAuth: AngularFireAuth,
    public usuarioServicio: UsuarioServicioProvider,
    public alertCtrl: AlertController,
    public camera: Camera) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

    if (this.navParams.get('id')) {
      this.id = this.navParams.get('id');
      //this.getDatosConductor();
    }

    this.myForm = this.formBuilder.group({
      tarifa: ['', Validators.required],
      distanciaMaxima: ['', Validators.required]
    });


  }

  public editarCampos(){
    this.isDisabled = !this.isDisabled;
  }

  cancelarGuardar(){
    this.isDisabled = true;
  }

  mostrarPerfilCliente(user) {
    this.afDB.object('usuarios/' + this.id)
      .valueChanges().subscribe(usuarioGuardado => {
        this.usuario = usuarioGuardado;
      });

    this.afDB.object('conductor/' + this.id)
      .valueChanges().subscribe(conductorGuardado => {
        this.conductor = conductorGuardado;
      });

    firebase.storage().ref('FotosConductor/' + this.id + '/fotoCarnet.png').getDownloadURL().then((url) => {
      this.fotoCarnet = url;
    });
    firebase.storage().ref('FotosConductor/' + this.id + '/fotoDni.png').getDownloadURL().then((url) => {
      this.fotoDni = url;
    });

  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosConductorPage');
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));
  }

  setDatosConductor(){
    if (!this.conductor.tarifa){
      return alert('Por favor, ingrese una tarifa');
    }
    if (!this.conductor.distanciaMaxima){
      return alert('Por favor, ingrese la distancia maxima de busqueda de conductores.');
    }

    let alerta = this.alertCtrl.create({
      title: 'Actualizar Datos Conductor',
      message: '¿Confirmar los cambios?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar clicked');

            this.afDB.database.ref('conductor/' + this.usuario.id).update(this.conductor);

            let loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Guardado cambios..',
              duration: 3000
            });

            loading.onDidDismiss(() => {
              console.log('Dismissed loading');
            });

            loading.present();

            this.usuarioServicio.changeMessage('asda');

            this.usuarioServicio.currentMesagge.subscribe(message => { });
            this.usuarioServicio.changeMessage('asda');

            this.navCtrl.setRoot('PerfilClientePage', { 'flag': false });
          }
        }]
    })
    alerta.present();

  }

}
