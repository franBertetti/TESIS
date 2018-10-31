  import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';



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
  Localidades = [];
  conductor:any={estado:null};


  myForm: FormGroup;  

  constructor(public afDB: AngularFireDatabase,
     public navCtrl: NavController,
      public navParams: NavParams,
      public fireAuth:AngularFireAuth,
       public menuCtrl:MenuController,
       public formBuilder: FormBuilder,
       public loadingCtrl: LoadingController,
       public camera: Camera) {


        this.getLocalidad().valueChanges().subscribe(localidadesGuardadas => {
        console.log(localidadesGuardadas)
        this.Localidades = localidadesGuardadas;
        });
      
        this.myForm = this.formBuilder.group({
          //fotoPerfilUsuario: ['', Validators.required],
          nombreCompleto: ['', Validators.required],
          dni: ['', Validators.required],
          fechaNacimiento: ['', Validators.required],
          numCelular: ['', Validators.required],
          direccion: ['', Validators.required],
          localidad: ['', Validators.required],
          numPiso: [''],
          numDepto: ['']
        });

        this.conductor.estado = ""; 

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

public getLocalidad(){
  return this.afDB.list('Localidad/');
}

  iraRealizarReserva(){
    this.navCtrl.setRoot('PerfilClientePage');
  }

  crearDatosUsuario(){

    if (!this.fotoPerfil){
      return alert('Falta la foto de Perfil ');
    }
  //this.usuario.fotoPerfil = this.myForm.value.fotoPerfilUsuario;
    this.usuario.nombreCompleto = this.myForm.value.nombreCompleto;
    this.usuario.dni = this.myForm.value.dni;
    this.usuario.fechaNacimiento = this.myForm.value.fechaNacimiento;
    this.usuario.numCelular = this.myForm.value.numCelular;
    this.usuario.direccion = this.myForm.value.direccion;
    this.usuario.localidad = this.myForm.value.localidad;

    if (!this.myForm.value.numPiso){ 
      this.usuario.numPiso = ''; 
    } else {
      this.usuario.numPiso = this.myForm.value.numPiso;
    }
    
    if (!this.myForm.value.numDepto){ 
      this.usuario.numDepto = ''; 
    } else {
      this.usuario.numDepto = this.myForm.value.numDepto;
    }

    this.afDB.database.ref('usuarios/'+this.usuario.id).set(this.usuario);

    this.afDB.database.ref('usuarios/'+this.usuario.id+'/conductor/').set(this.conductor);

    const selfieRefPerfil = firebase.storage().ref('FotosUsuario/'+this.usuario.id+'/fotoPerfil.png');
    selfieRefPerfil.putString(this.perfilPerfil, 'base64', {contentType: 'image/png'});


    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait',
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

    this.navCtrl.setRoot('PerfilClientePage', {'Photo': this.fotoPerfil} );
  }
}



//a