import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, MenuController, AlertController } from 'ionic-angular';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { Camera, CameraOptions } from '@ionic-native/camera';
import firebase from 'firebase';
import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';


/**
 * Generated class for the PenalizacionPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-penalizacion',
  templateUrl: 'penalizacion.html',
})
export class PenalizacionPage {

  numeroContratacion;
  perfil: any;
  foto: any;
  fotos: any = [];
  fotosParaGuardar: any = [];
  tipoPenalizaciones: any = [];
  viaje: any;
  flag: boolean;
  penalizacion: any = {};

  tipoPenalizacion: any = {};

  constructor(public navCtrl: NavController, public navParams: NavParams, public menuCtrl: MenuController,
    public camera: Camera, public afDB: AngularFireDatabase, public fireAuth: AngularFireAuth, public alertCtrl: AlertController) {
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
    if (this.navParams.get('viaje')) {
      this.viaje = this.navParams.get('viaje');
      this.numeroContratacion = this.viaje.numeroContratacion;
      console.log(this.viaje);
    }


    this.getTipoPenalizacion()
      .valueChanges().subscribe(TipoPenalizacionesGuardadas => {
        console.log(TipoPenalizacionesGuardadas)
        this.tipoPenalizaciones = TipoPenalizacionesGuardadas;
      });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PenalizacionPage');
  }

  public actualizarValoresForm(nombre) {

    firebase.database().ref('tipoPenalizacion/').orderByChild('nombre').equalTo(nombre).on('child_added', (snapshot) => {
      this.tipoPenalizacion = snapshot.val();
    });

  }

  public getTipoPenalizacion() {
    return this.afDB.list('tipoPenalizacion/');
  }

  tomarFoto(): void {
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

  buscarFoto(): void {
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

  registrarFotos() {

    if (this.tipoPenalizacion.nombre) {
      this.penalizacion.nombre = this.tipoPenalizacion.nombre;
    } else {
      return alert('Por favor elija un tipo de penalización');
    }

    if (this.fotos.length == 0) {
      return alert('Por favor seleccione al menos una foto para ratificar lo sucedido');
    }

    let alerta = this.alertCtrl.create({
      title: 'Confirmar Penalización?',
      message: 'Desea guardar los datos?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
            this.flag = false;
          }
        },
        {
          text: 'Aceptar',
          handler: () => {
            console.log('Aceptar clicked');

            let Alert = this.alertCtrl.create({
              title: 'Penalización registrada!',
              message: 'La penalización fue registrada correctamente!',
              buttons: [{
                text: 'Aceptar',
                handler: () => {
                  this.flag = true;

                  if (this.flag == true) {
                    this.penalizacion.id = this.viaje.numeroContratacion;
                    this.penalizacion.descripcion = this.tipoPenalizacion.descripcion;
                    this.penalizacion.monto = this.tipoPenalizacion.monto;
                    if (this.tipoPenalizacion.descripcionAdicional) {
                      this.penalizacion.descripcionAdicional = this.tipoPenalizacion.descripcionAdicional;
                    } else {
                      this.penalizacion.descripcionAdicional = '';
                    }
                    this.penalizacion.estado = "No fue abonado";
                    this.penalizacion.idConductor = this.viaje.idConductor;
                    this.penalizacion.idCliente = this.viaje.idUsuario;
                    this.penalizacion.nombreCliente = this.viaje.nombreCliente;
                    this.penalizacion.nombreConductor = this.viaje.nombreConductor;
                    this.penalizacion.fecha = this.viaje.fecha;
                    this.penalizacion.direccion = this.viaje.direccionDeBusqueda;
                    this.penalizacion.hora = this.viaje.hora;
                    this.penalizacion.tipoContratacion = this.viaje.tipoContratacion;
                    this.penalizacion.cantFotos = this.fotos.length;

                    this.viaje.estado = "cancelado";


                    this.afDB.database.ref('penalizacion/' + this.penalizacion.id).set(this.penalizacion);
                    this.afDB.database.ref('viaje/' + this.viaje.numeroContratacion + '/estado/').set(this.viaje.estado);

                    console.log(this.penalizacion);



                    for (var i = 0, len = this.fotos.length; i < len; i++) {

                      const selfieRef = firebase.storage().ref('Penalizacion/' + this.penalizacion.id + '/foto' + i + '.png');
                      selfieRef.putString(this.fotosParaGuardar[i], 'base64', { contentType: 'image/png' });

                    }

                    this.navCtrl.setRoot(PerfilClientePage, { 'preguntarEstadoConductor': true });

                  }

                }
              }
              ]

            })
            Alert.present();

          }
        }]
    })
    alerta.present();

  }
}
