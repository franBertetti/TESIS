import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { firebaseConfig } from '../../app/app.module';
//import { Storage } from '@ionic/storage';
import { initializeApp } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { FcmProvider } from '../../providers/fcm/fcm';




/**
 * Generated class for the RegistrarConductorPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-conductor',
  templateUrl: 'registrar-conductor.html',
})
export class RegistrarConductorPage {

  conductor: any = {};
  TipoVehiculos = [];
  fotoCarnet: any;
  fotoDni: any;
  perfilDni: any;
  perfilCarnet: any;
  usuario: any = {};
  id;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public afDB: AngularFireDatabase,
    public loadingCtrl: LoadingController,
    public fireAuth: AngularFireAuth,
    public afAuth: AngularFireAuth,
    public usuarioServicio: UsuarioServicioProvider,
    public alertCtrl: AlertController,
    public camera: Camera,
    public fcm: FcmProvider) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina

    if (this.navParams.get('id')){
      this.id = this.navParams.get('id');
      //this.getDatosConductor();
    }
    
    this.getTipoVehiculo()
      .valueChanges().subscribe(TipoVehiculoGuardados => {
        console.log(TipoVehiculoGuardados)
        this.TipoVehiculos = TipoVehiculoGuardados;
        initializeApp(firebaseConfig);
        //this.nombre = this.usuario.nombreCompleto;

      });
  }

  tomarFotoDni(): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      this.perfilDni = profilePicture;
      this.fotoDni = 'data:image/jpeg;base64,' + this.perfilDni;
    });

  }

  buscarFotoDni(): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      this.perfilDni = profilePicture;
      this.fotoDni = 'data:image/jpeg;base64,' + this.perfilDni;
    });
  }

  tomarFotoCarnet(): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      allowEdit: false,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      this.perfilCarnet = profilePicture;
      this.fotoCarnet = 'data:image/jpeg;base64,' + this.perfilCarnet;
    });

  }

  buscarFotoCarnet(): void {
    this.camera.getPicture({
      quality: 95,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      allowEdit: false,
      encodingType: this.camera.EncodingType.PNG,
      mediaType: this.camera.MediaType.PICTURE,
      targetWidth: 500,
      targetHeight: 500,
      saveToPhotoAlbum: true
    }).then(profilePicture => {
      this.perfilCarnet = profilePicture;
      this.fotoCarnet = 'data:image/jpeg;base64,' + this.perfilCarnet;
    });

  }


  public getTipoVehiculo() {
    return this.afDB.list('TipoVehiculo/');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarConductorPage');
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));
  }

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
          this.conductor.id = this.usuario.id;
          firebase.storage().ref('FotosConductor/' + this.usuario.id + '/fotoCarnet.png').getDownloadURL().then((url) => {
            this.fotoCarnet = url;
          });
          firebase.storage().ref('FotosConductor/' + this.usuario.id + '/fotoCarnet.png').getDownloadURL().then((url) => {
            this.fotoCarnet = url;
          });
        });  //con el valueChanges le estoy diciendox q ante cualquier cambio de estado se suscriba a los cambios 
    }




    this.afDB.object('usuarios/' + user.uid)
      .valueChanges().subscribe(usuarioGuardado => {
        this.usuario = usuarioGuardado;
      });
    //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
  }

  guardarDatosConductor() {

    console.log(this.conductor);
    console.log(this.perfilCarnet);
    console.log(this.perfilDni);
    console.log(this.conductor.tarifa);
    console.log(this.conductor.distanciaMaxima);
    console.log(this.conductor.VehiculosHabilitado);

    if (!this.fotoCarnet) {
      return alert('Por favor, ingrese su foto carnet');
    }
    if (!this.fotoDni) {
      return alert('Por favor, ingrese su foto con el documento');
    }
    if (!this.conductor.tarifa){
      return alert('Por favor, ingrese una tarifa');
    }
    if (!this.conductor.distanciaMaxima){
      return alert('Por favor, ingrese la distancia maxima de busqueda de conductores.');
    }

    if (!this.conductor.VehiculosHabilitado){
      return alert('Por favor, ingrese el tipo de vehiculo coincidente a su licencia.');
    }

    let alerta = this.alertCtrl.create({
      title: 'Solicitud de Conductor',
      message: '¿Confirmar Solicitud de conductor?',
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

            this.conductor.puntaje = "-";
            this.afDB.database.ref('conductor/' + this.usuario.id).update(this.conductor);
            //.set(this.conductor);

            const selfieRefCarnet = firebase.storage().ref('FotosConductor/' + this.usuario.id + '/fotoCarnet.png');
            selfieRefCarnet.putString(this.perfilCarnet, 'base64', { contentType: 'image/png' });
            const selfieRefDni = firebase.storage().ref('FotosConductor/' + this.usuario.id + '/fotoDni.png');
            selfieRefDni.putString(this.perfilDni, 'base64', { contentType: 'image/png' });

            var token = firebase.database().ref('usuario/' + this.id + '/token');

            this.fcm.setId(this.id);
            this.fcm.setEstadoConductor(token);

            let loading = this.loadingCtrl.create({
              spinner: 'crescent',
              content: 'Guardado solicitud..',
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

