import { Component, OnInit } from '@angular/core';
import { NavController, MenuController, LoadingController, Loading, AlertController, NavParams, Platform } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import { ToastController } from 'ionic-angular';
import { tap } from 'rxjs/operators';
import { FcmProvider } from '../../providers/fcm/fcm';

import { RegistrarUsuarioPage } from '../registrar-usuario/registrar-usuario';
import { RestablecerPasswordPage } from '../restablecer-password/restablecer-password';
import { AyudaPage } from '../ayuda/ayuda';
import { RealizarReservaPage } from '../realizar-reserva/realizar-reserva';
import { UsuarioServicioProvider } from '../../providers/usuario-servicio/usuario-servicio';
import { PerfilClientePage } from '../perfil-cliente/perfil-cliente';
import { Facebook } from '@ionic-native/facebook';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {

  splash = true;
  //secondPage = SecondPagePage;

  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading: Loading;

  passwordShown:boolean = false;
  passwordType: string = 'password';

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController,
    public fcm: FcmProvider,
    public usuarioService: UsuarioServicioProvider,
    public toastCtrl: ToastController,
    public fb:Facebook,
    public platform: Platform) {

    if (this.navParams.get('splash')) {
      this.splash = this.navParams.get('splash');
    }

    if (this.navParams.get('usuario')) {
      this.user = this.navParams.get('usuario');
    }


    console.log("entro a loginPage");

    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.user = afAuth.authState;
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

  ngOnInit() {

  }

  public togglePassword(){
    if (this.passwordShown){
      this.passwordShown = false;
      this.passwordType ='password';
    } else {
      this.passwordShown = true;
      this.passwordType = 'text';
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
    if (this.navParams.get('splash')) {
      this.splash = this.navParams.get('splash');
    }
    setTimeout(() => this.splash = false, 4000);

    /*this.fcm.getToken();*/




    this.fcm.listenToNotifications().pipe(
      tap(msg => {
        const toast = this.toastCtrl.create({
          message: msg.body,
          duration: 3000
        });
        toast.present();
      })
    )
  }

/*  signInWithFacebook() {

    if (this.platform.is('cordova')){
      //celular
      this.fb.login(['email', 'public_profile']).then(res=> {
        const facebookCredential = firebase.auth.FacebookAuthProvider.credential(res.authResponse.accessToken);
        firebase.auth().signInWithCredential(facebookCredential)
        .then(user => {
          console.log(user);
          this.usuarioService.cargarUsuario(
            user.displayName,
            user.email,
            user.photoURL,
            user.uid,
            'facebook'
          )
        });
  
      this.afAuth.user.subscribe(snap => {
        this.fcm.setId(snap.uid);
        this.fcm.getToken();
      });
  
      let loading = this.loadingCtrl.create({
        spinner: 'crescent',
        content: 'Please Wait',
        duration: 3500
      });
      loading.present();
  
      this.navCtrl.setRoot(PerfilClientePage);
        }).catch(e => console.log('Error con el login' + JSON.stringify(e)));
    }else{
    this.afAuth.auth
      .signInWithPopup(new firebase.auth.FacebookAuthProvider())
      .then(res => {
        console.log(res);
        let user = res.user;
        this.usuarioService.cargarUsuario(
          user.displayName,
          user.email,
          user.photoURL,
          user.uid,
          'facebook'
        )
      });

    this.afAuth.user.subscribe(snap => {
      this.fcm.setId(snap.uid);
      this.fcm.getToken();
    });

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait',
      duration: 3500
    });
    loading.present();

    this.navCtrl.setRoot(PerfilClientePage);
  }
}

  signOut(){
    this.afAuth.auth.signOut();
    this.usuarioService.Usuario = {};
  }
*/

  loginUsuario() {

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);



    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");

      this.afAuth.user.subscribe(snap => {
        this.fcm.setId(snap.uid);
        this.fcm.getToken();
      });

      console.log(this.user);
      if (this.myForm.value.email == 'admin@admin.com' && this.myForm.value.password == 'admin123' ||
      this.myForm.value.email == 'Admin@admin.com' && this.myForm.value.password == 'admin123') {
        this.navCtrl.setRoot('AdministradorPage');
      } else {
        this.navCtrl.setRoot('PerfilClientePage');
      };

    }, (err) => {
      loading.dismiss().then(() => {
        let alert = this.alertCtrl.create({
          message: err.message,
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

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando...',
      duration: 3500
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

  }




  irARegistrarUsuario() {
    /*this.navCtrl.push(Pagina2Page);*/
    /*navegacion mediante url:*/
    /*ESTO ES MUY UTIL YA QUE PODRIA SER UN EJEMPLO DE DECIR SI ELIGE ROPA PARA NIÑOS O ADULTOS, Y DE ACUERDO AL BOTON
    QUE APRETA EL PARAEMTRO Q PASO, CON PARAM, LE PASO EL PARAMETRO GET A LA PAGINA A LA QUE VOY */
    this.navCtrl.push(RegistrarUsuarioPage);
  }

  iraRestablecerPassword() {
    this.navCtrl.push(RestablecerPasswordPage);
  }

  iraAyuda() {
    this.navCtrl.push(AyudaPage);
  }

  iraRealizarReserva() {
    this.navCtrl.push(RealizarReservaPage);
  }

  iraPerfilClientes() {

    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Cargando...',
      duration: 3500
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();



    this.navCtrl.setRoot('PerfilClientePage');
  }




}
