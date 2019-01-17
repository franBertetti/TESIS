import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { AngularFireAuth } from 'angularfire2/auth';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';

//imports de autocompletar

import { NgZone, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl } from "@angular/forms";
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';





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

  //declaraciones autocompletar

  public latitude: number;
  public longitude: number;
  public searchControl: FormControl;
  public zoom: number;
  direccionFormateada;
  localidadFormateada;
  provinciaFormateada;

  @ViewChild("search")
  public searchElementRef;


  usuario: any = {};
  fotoPerfil: any;
  perfilPerfil: any;
  Localidades = [];
  conductor: any = {};
  flag = false;
  isDisabled: boolean = true;
  myForm: FormGroup;
  registrandoUsuario: boolean = false;
  noGuardar: boolean;
  dirDesdeBd;

  constructor(public afDB: AngularFireDatabase,
    public navCtrl: NavController,
    public navParams: NavParams,
    public fireAuth: AngularFireAuth,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public loadingCtrl: LoadingController,
    public camera: Camera,
    public alertCtrl: AlertController,
    public usuarioServicio: UsuarioServicioProvider,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) {

    this.zoom = 15;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();



    if (this.navParams.get('registrandoUsuario')) {
      this.registrandoUsuario = this.navParams.get('registrandoUsuario');
      this.isDisabled = false;
      console.log('registrandoUsuario');
      console.log(this.registrandoUsuario);
    }

    if (this.navParams.get('id')) {
      var parametro = this.navParams.get('id');
      console.log(parametro);
    }

    if (this.navParams.get('flag')) {
      this.flag = this.navParams.get('flag');
    }

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
      provincia: ['', Validators.required],
      numPiso: [''],
      numDepto: ['']
    });

    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }


  ionViewDidLoad() {
    console.log('ionViewDidLoad DatosPersonalesUsuarioPage');
    //this.fireAuth.user.subscribe(user=> console.log(user));  
    this.fireAuth.user.subscribe(user => this.mostrarPerfilCliente(user));


    this.zoom = 15;
    this.latitude = 39.8282;
    this.longitude = -98.5795;

    //create search FormControl
    this.searchControl = new FormControl();

    //set current position
    this.setCurrentPosition();

    //load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let nativeHomeInputBox = document.getElementById('txtHome').getElementsByTagName('input')[0];
      let autocomplete = new google.maps.places.Autocomplete(nativeHomeInputBox, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          var length = 0;
          length = place.address_components.length;

          for (let i = 0; i < length; i++) {
            console.log(place.address_components[i]);
          }

          console.log(place.formatted_address);
          this.direccionFormateada = place.formatted_address;
          console.log('localidad:');
          this.localidadFormateada = place.vicinity;
          this.usuario.localidad = this.localidadFormateada;
          this.myForm.value.localidad = this.usuario.localidad;

          var divisiones = place.formatted_address.split(",", length);
          //console.log(divisiones);
          console.log("provincia:");
          console.log(divisiones[2]);
          this.provinciaFormateada = divisiones[2].trim();
          this.myForm.value.provincia = this.provinciaFormateada;
          this.usuario.provincia = this.provinciaFormateada;

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          console.log('latitud:');
          this.latitude = place.geometry.location.lat();
          console.log(this.latitude);
          console.log('longitud:');
          this.longitude = place.geometry.location.lng();
          console.log(this.longitude);
          this.zoom = 15;
        });
      });
    });

  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }

  public editarCampos() {
    this.isDisabled = !this.isDisabled;
  }

  cancelarGuardar() {
    this.isDisabled = true;
  }

  mostrarPerfilCliente(user) {
    if (user) {
      this.afDB.object('usuarios/' + user.uid)
        .valueChanges().subscribe(usuarioGuardado => {
          this.usuario = usuarioGuardado;
          this.conductor.id = this.usuario.id;
          this.dirDesdeBd = this.usuario.direccion;
          firebase.storage().ref('FotosUsuario/' + user.uid + '/fotoPerfil.png').getDownloadURL().then((url) => {
            this.fotoPerfil = url;
          });
        });  //con el valueChanges le estoy diciendox q ante cualquier cambio de estado se suscriba a los cambios 
    }
  }

  tomarFotoPerfil(): void {
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
      this.perfilPerfil = profilePicture;
      this.fotoPerfil = 'data:image/jpeg;base64,' + this.perfilPerfil;
    });

  }


  buscarFotoPerfil(): void {
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
      this.perfilPerfil = profilePicture;
      this.fotoPerfil = 'data:image/jpeg;base64,' + this.perfilPerfil;
    });
  }

  public getLocalidad() {
    return this.afDB.list('Localidad/');
  }

  iraRealizarReserva() {
    this.navCtrl.setRoot('PerfilClientePage');
  }

  verificarDireccion(){
    if (this.isDisabled == false){
      if (!this.direccionFormateada){
        this.usuario.direccion = this.dirDesdeBd;
      } else {
        this.usuario.direccion = this.direccionFormateada;
      }
    }
  }


  crearDatosUsuario() {

    if (!this.fotoPerfil) {
      return alert('Falta la foto de Perfil ');
    }
    //this.usuario.fotoPerfil = this.myForm.value.fotoPerfilUsuario;

    this.usuario.nombreCompleto = this.myForm.value.nombreCompleto;
    this.usuario.dni = this.myForm.value.dni;
    this.usuario.fechaNacimiento = this.myForm.value.fechaNacimiento;
    this.usuario.numCelular = this.myForm.value.numCelular;
    //this.usuario.direccion = this.myForm.value.direccion;
    this.verificarDireccion();
    this.usuario.localidad = this.myForm.value.localidad;
    this.usuario.provincia = this.myForm.value.provincia;

    this.usuario.nombreCompleto = this.myForm.value.nombreCompleto;
    if (this.usuario.nombreCompleto == '' || this.usuario.fechaNacimiento == '' ||
      this.usuario.numCelular == '' || this.usuario.direccion == '' || this.usuario.localidad == '') {
      this.noGuardar = true;
    } else {
      this.noGuardar = false;
    }


    if (!this.myForm.value.numPiso && !this.myForm.value.numDepto) {
      this.usuario.numPiso = '';
      this.usuario.numDepto = '';
    } else if (!this.myForm.value.numPiso) {
      return alert('Por favor, ingrese el numero de piso');
    } else if (!this.myForm.value.numDepto) {
      return alert('Por favor, ingrese el numero de departamento');
    }

    if (this.noGuardar == true) {

      return alert('Por favor, complete los datos obligatorios (*)');
    } else {

      if (this.flag == false) {

        let alert = this.alertCtrl.create({
          title: 'Confirmar Datos Usuario',
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


                this.afDB.database.ref('usuarios/' + this.usuario.id).set(this.usuario);

                if (this.flag == false) {
                  //this.conductor.id = this.usuario.id;
                  this.afDB.database.ref('conductor/' + this.usuario.id).set(this.conductor);
                }
            
            
                //if (this.perfilPerfil != undefinded) {
                if (this.perfilPerfil) {
                  const selfieRefPerfil = firebase.storage().ref('FotosUsuario/' + this.usuario.id + '/fotoPerfil.png');
                  selfieRefPerfil.putString(this.perfilPerfil, 'base64', { contentType: 'image/png' }).then((snapshot) => {
                    console.log("snapshot.downloadURL", snapshot.downloadURL);
                    this.usuarioServicio.changeMessage('asdasd');
                  });
                }


                let loading = this.loadingCtrl.create({
                  spinner: 'crescent',
                  content: 'Cargando..',
                  duration: 3000
                });

                loading.onDidDismiss(() => {
                  console.log('Dismissed loading');
                });

                loading.present();

                
                this.navCtrl.setRoot('PerfilClientePage', { 'Photo': this.fotoPerfil });
                console.log('Buy clicked');
              }
            }
          ]
        });
        alert.present();
      }

      if (this.flag == true) {

        let alert = this.alertCtrl.create({
          title: 'Confirmar Cambios',
          message: '¿Desea guardar los cambios?',
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

                this.afDB.database.ref('usuarios/' + this.usuario.id).set(this.usuario);

                if (this.flag == false) {
                  //this.conductor.id = this.usuario.id;
                  this.afDB.database.ref('conductor/' + this.usuario.id).set(this.conductor);
                }
            
            
                //if (this.perfilPerfil != undefinded) {
                if (this.perfilPerfil) {
                  const selfieRefPerfil = firebase.storage().ref('FotosUsuario/' + this.usuario.id + '/fotoPerfil.png');
                  selfieRefPerfil.putString(this.perfilPerfil, 'base64', { contentType: 'image/png' }).then((snapshot) => {
                    console.log("snapshot.downloadURL", snapshot.downloadURL);
                    this.usuarioServicio.changeMessage('asdasd');
                  });
                }


                let loading = this.loadingCtrl.create({
                  spinner: 'crescent',
                  content: 'Guardado cambios..',
                  duration: 3000
                });

                loading.onDidDismiss(() => {
                  console.log('Dismissed loading');
                });

                loading.present();

                this.navCtrl.setRoot('PerfilClientePage', { 'Photo': this.fotoPerfil });
                console.log('Buy clicked');
              }
            }
          ]
        });
        alert.present();
      }

    }

  }

  //}
}