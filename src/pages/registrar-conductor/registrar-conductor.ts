import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import firebase from 'firebase';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { firebaseConfig } from '../../app/app.module';
//import { Storage } from '@ionic/storage';
import  { initializeApp } from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';




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

conductor:any={};
TipoVehiculos = [];
//selfieRef:any;
usuario:any = {};
nombre:any;
image: string = null;
data_url_image: any = null;


  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl:MenuController,
              public afDB: AngularFireDatabase,
              public fireAuth:AngularFireAuth,
              public cameraPlugin: Camera,
              /*public storage: Storage*/) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
    this.getTipoVehiculo()
    .valueChanges().subscribe(TipoVehiculoGuardados => {
      console.log(TipoVehiculoGuardados)
      this.TipoVehiculos = TipoVehiculoGuardados;
      initializeApp(firebaseConfig);
      //this.nombre = this.usuario.nombreCompleto;

});
}

getPicture(){
  let options: CameraOptions = {
    destinationType: this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
    targetWidth: 1000,
    targetHeight: 1000,
    quality: 100
  }
  this.cameraPlugin.getPicture( options )
  .then(imageData => {
    this.image = `data:image/jpeg;base64,${imageData}`;
    this.data_url_image = options.destinationType;
  })
  .catch(error =>{
    console.error( error );
  });
}

guardar(){
const fotoCarnet = firebase.storage().ref('profilePictures/user1/profilePicture.png');
fotoCarnet.putString(this.image, this.data_url_image);
}


tomarFotoCarnet(): void {
  this.cameraPlugin.getPicture({
    quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
    allowEdit : false,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    mediaType: this.cameraPlugin.MediaType.PICTURE,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(profilePicture => {
     const selfieRef = firebase.storage().ref('profilePictures/FrancoBertetti/fotoCarnet.png');
    selfieRef
    .putString(profilePicture, 'base64', {contentType: 'image/png'})
    .then(savedProfilePicture => {
      firebase
        .database()
        .ref(`users/FrancoBertetti/profilePicture`)
        .set(savedProfilePicture.downloadURL);
        //miFotoCarnet = this.cameraPlugin.getPicture(option)
    });
});
/*
const options: CameraOptions = {
  quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
    //allowEdit : true,
    encodingType: this.cameraPlugin.EncodingType.JPEG,
    mediaType: this.cameraPlugin.MediaType.PICTURE,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
}
this.cameraPlugin.getPicture(options).then((ImageData) => {
  this.miFotoCarnet = 'data:image/jpeg;base64,' + ImageData;
});
*/
}

tomarFotoDesdeGaleria(): void {
  this.cameraPlugin.getPicture({
    quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.PHOTOLIBRARY,
    allowEdit : false,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(profilePicture => {
    const selfieRef = firebase.storage().ref('profilePictures/FrancoBertetti/fotoDni.png');
   selfieRef
   .putString(profilePicture, 'base64', {contentType: 'image/png'})
   .then(savedProfilePicture => {
     firebase
       .database()
       .ref(`users/FrancoBertetti/profilePicture`)
       .set(savedProfilePicture.downloadURL);
       //miFotoCarnet = this.cameraPlugin.getPicture(option)
   });
});
}




public getTipoVehiculo(){
   return this.afDB.list('TipoVehiculo/');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarConductorPage');
    this.fireAuth.user.subscribe(user=> this.mostrarPerfilCliente(user));
  }

  mostrarPerfilCliente(user){
    this.afDB.object('usuarios/'+user.uid)
    .valueChanges().subscribe(usuarioGuardado => {
      this.usuario = usuarioGuardado;
    });  //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
}

  guardarDatosConductor(){
    this.afDB.database.ref('usuarios/'+this.usuario.id+'/conductor/').set(this.conductor);
    this.navCtrl.setRoot('PerfilClientePage');
  }
}
