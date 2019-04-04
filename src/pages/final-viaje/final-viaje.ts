
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, AlertController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';

/**
 * Generated class for the FinalViajePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-final-viaje',
  templateUrl: 'final-viaje.html',
})
export class FinalViajePage {

  viaje: any = {};
  load;
  perfil: any;
  foto: any;
  fotos: any = [];
  fotosParaGuardar: any = [];
  tipoPenalizaciones: any = [];
  flag: boolean;
  penalizacion: any = {};

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public loading: LoadingController,
    public camera: Camera,
    public afDB: AngularFireDatabase,
    public fireAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public menuCtrl: MenuController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
      this.load = this.loading.create({
        spinner: 'crescent'
      });
      this.load.present();

    if (this.navParams.get('viaje')) {
      this.viaje = this.navParams.get('viaje');
      console.log(this.viaje);
    }
    firebase.storage().ref('FotosUsuario/' + this.viaje.idUsuario + '/fotoPerfil.png').getDownloadURL().then((url) => {
      this.viaje.fotoPerfil = url;
      this.load.dismiss();
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FinalViajePage');
  }

  tomarFoto() {
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
      this.perfil = profilePicture;
      this.foto = 'data:image/jpeg;base64,' + this.perfil;
      this.fotos.push(this.foto);
      this.fotosParaGuardar.push(this.perfil);
    });
  }

  borrarFoto(index) {
    this.fotos.splice(index, 1);
    this.fotosParaGuardar.splice(index, 1);
  }

  iraPerfilCliente() {
    this.navCtrl.setRoot('PerfilClientePage');
  }

  guardarFinalViaje() {

    if (this.fotos.length == 0) {
      return alert('Por favor seleccione al menos una foto para ratificar el viaje');
    }

    let alerta = this.alertCtrl.create({
      title: 'Finalizar Viaje',
      message: 'Desea guardar los datos?',
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

            this.afDB.database.ref('viaje/' + this.viaje.numeroContratacion + '/direccionDestino/').set(this.viaje.direccionDestino);
            this.afDB.database.ref('viaje/' + this.viaje.numeroContratacion + '/estado/').set('finalizado');
            this.afDB.database.ref('viaje/' + this.viaje.numeroContratacion + '/latitudDireccionDestino/').set(this.viaje.latitudDireccionDestino);
            this.afDB.database.ref('viaje/' + this.viaje.numeroContratacion + '/longitudDireccionDestino/').set(this.viaje.longitudDireccionDestino);


            for (var i = 0, len = this.fotos.length; i < len; i++) {

              const selfieRef = firebase.storage().ref('vi/' + this.viaje.numeroContratacion + '/foto' + i + '.png');
              selfieRef.putString(this.fotosParaGuardar[i], 'base64', { contentType: 'image/png' });
            }

            this.navCtrl.setRoot(PerfilClientePage, { 'preguntarEstadoConductor': true });

          }

        }

      ]
    })
    alerta.present();

  }
}











