import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams,LoadingController, Loading, AlertController } from 'ionic-angular';
import { MenuController } from 'ionic-angular';
import { LoginPage } from '../login/login';
import { DatosPersonalesUsuarioPage } from '../datos-personales-usuario/datos-personales-usuario';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { AngularFireAuth } from 'angularfire2/auth';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';


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
  usuario:any = {};//nombreCompleto:null, dni:null

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth, 
    public alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    public afDB: AngularFireDatabase) {
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
        console.log(res);
        this.usuario.id = res.user.uid;
        this.usuario.email = res.user.email;
        this.afDB.database.ref('usuarios/'+this.usuario.id).set(this.usuario);
        this.navCtrl.setRoot('DatosPersonalesUsuarioPage', {'registrandoUsuario': true } );
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
        spinner: 'crescent',
        content: 'Cargando..',
        duration: 3000
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
    this.navCtrl.push('DatosPersonalesUsuario');
    
  }
}
