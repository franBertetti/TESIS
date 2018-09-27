import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatosPersonalesUsuarioPage } from '../datos-personales-usuario/datos-personales-usuario';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

/**
 * Generated class for the RegistrarUsuarioPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-registrar-usuario',
  templateUrl: 'registrar-usuario.html',
})
export class RegistrarUsuarioPage {

  myForm: FormGroup;
  public loading:Loading;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
      this.myForm = this.formBuilder.group({
        email: ['', Validators.required],
        password: ['', Validators.required]
      });

    this.menuCtrl.enable(false, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

registrarUsuario(){
    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);
   

    this.afAuth.auth.createUserWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password)
    .then(
      res => {
        this.navCtrl.setRoot('PerfilClientePage');
      }, error => {
        this.loading.dismiss().then( () => {
          let alert = this.alertCtrl.create({
            message: error.message,
            buttons: [
              {
                text: "Ok",
                role: 'cancel'
              }
            ]
          });
          alert.present();
        });
      });

      this.loading = this.loadingCtrl.create({
        dismissOnPageChange: true,
      });
      this.loading.present();
    
  }


  public irALogin(){
    this.navCtrl.push(LoginPage);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad RegistrarUsuarioPage');
  }

  iraDatosPersonales(){
    this.navCtrl.push(DatosPersonalesUsuarioPage);
  }
}
