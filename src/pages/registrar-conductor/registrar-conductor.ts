import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController } from 'ionic-angular';
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
fotoCarnet:any;
fotoDni:any;
perfilDni:any;
perfilCarnet:any;
usuario:any = {};



  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl:MenuController,
              public afDB: AngularFireDatabase,
              public loadingCtrl: LoadingController,
              public fireAuth:AngularFireAuth,
              public camera: Camera) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
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
  quality : 95,
  destinationType : this.camera.DestinationType.DATA_URL,
  sourceType : this.camera.PictureSourceType.CAMERA,
  allowEdit : false,
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
quality : 95,
destinationType : this.camera.DestinationType.DATA_URL,
sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
allowEdit : false,
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
quality : 95,
destinationType : this.camera.DestinationType.DATA_URL,
sourceType : this.camera.PictureSourceType.CAMERA,
allowEdit : false,
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
quality : 95,
destinationType : this.camera.DestinationType.DATA_URL,
sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
allowEdit : false,
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
    });
      //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
}

  guardarDatosConductor(){
    this.afDB.database.ref('conductor/'+this.usuario.id).set(this.conductor);
    
    const selfieRefCarnet = firebase.storage().ref('FotosConductor/'+this.usuario.id+'/fotoCarnet.png');
    selfieRefCarnet.putString(this.perfilCarnet, 'base64', {contentType: 'image/png'});
    const selfieRefDni = firebase.storage().ref('FotosConductor/'+this.usuario.id+'/fotoDni.png');
    selfieRefDni.putString(this.perfilDni, 'base64', {contentType: 'image/png'});
    
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait',
      duration: 4500
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();


    this.navCtrl.setRoot('PerfilClientePage');
  }
}
