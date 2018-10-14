import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import firebase from 'firebase';
/*import { Camera } from '@ionic-native/camera';*/

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

Conductor:any={};
TipoVehiculos = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public menuCtrl:MenuController,
              public afDB: AngularFireDatabase/*,
  public cameraPlugin: Camera*/) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
    this.getTipoVehiculo()
    .valueChanges().subscribe(TipoVehiculoGuardados => {
      console.log(TipoVehiculoGuardados)
      this.TipoVehiculos = TipoVehiculoGuardados;
});
}
/*
takeSelfie(): void {
  this.cameraPlugin.getPicture({
    quality : 95,
    destinationType : this.cameraPlugin.DestinationType.DATA_URL,
    sourceType : this.cameraPlugin.PictureSourceType.CAMERA,
    allowEdit : true,
    encodingType: this.cameraPlugin.EncodingType.PNG,
    targetWidth: 500,
    targetHeight: 500,
    saveToPhotoAlbum: true
  }).then(profilePicture => {
    const selfieRef = firebase.storage().ref('profilePictures/user1/profilePicture.png');
  selfieRef
    .putString(profilePicture, 'base64', {contentType: 'image/png'})
    .then(savedProfilePicture => {
      firebase
        .database()
        .ref(`users/user1/profilePicture`)
        .set(savedProfilePicture.downloadURL);
    });
});
}
*/


public getTipoVehiculo(){
   return this.afDB.list('TipoVehiculo/');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarConductorPage');
  }

  iraPerfilCliente(){
    this.navCtrl.setRoot('PerfilClientePage');
  }
}
