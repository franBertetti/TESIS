  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';



/**
 * Generated class for the DatosPersonalesUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-datos-personales-usuario',
  templateUrl: 'datos-personales-usuario.html',
})
export class DatosPersonalesUsuarioPage {
  usuario:any = {};  
  fotoPerfil:any;
  perfilPerfil:any;

  constructor(public afDB: AngularFireDatabase,
     public navCtrl: NavController,
      public navParams: NavParams,
      public fireAuth:AngularFireAuth,
       public menuCtrl:MenuController,
       public camera: Camera) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPersonalesUsuarioPage');
    //this.fireAuth.user.subscribe(user=> console.log(user));  
    this.fireAuth.user.subscribe(user=> this.mostrarPerfilCliente(user));
  }

  mostrarPerfilCliente(user){
    if (user) {
    this.afDB.object('usuarios/'+user.uid)
    .valueChanges().subscribe(usuarioGuardado => {
      this.usuario = usuarioGuardado;
    });  //con el valueChanges le estoy diciendo q ante cualquier cambio de estado se suscriba a los cambios 
  }
}

tomarFotoPerfil(): void {
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
  this.perfilPerfil = profilePicture;
  this.fotoPerfil = 'data:image/jpeg;base64,' + this.perfilPerfil;
});

}

buscarFotoPerfil(): void {
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
  this.perfilPerfil = profilePicture;
  this.fotoPerfil = 'data:image/jpeg;base64,' + this.perfilPerfil;
});
}

  iraRealizarReserva(){
    this.navCtrl.setRoot('PerfilClientePage');
  }

  crearDatosUsuario(){
    this.afDB.database.ref('usuarios/'+this.usuario.id).set(this.usuario);

    const selfieRefPerfil = firebase.storage().ref('FotosUsuario/'+this.usuario.id+'/fotoPerfil.png');
    selfieRefPerfil.putString(this.perfilPerfil, 'base64', {contentType: 'image/png'});

    this.navCtrl.setRoot('PerfilClientePage');
  }
}
