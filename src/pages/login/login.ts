import { Component } from '@angular/core';
import { NavController, MenuController, LoadingController, Loading, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

import { RegistrarUsuarioPage } from '../registrar-usuario/registrar-usuario';
import { RestablecerPasswordPage } from '../restablecer-password/restablecer-password';
import { AyudaPage } from '../ayuda/ayuda';
import { RealizarReservaPage } from '../realizar-reserva/realizar-reserva';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {

  myForm: FormGroup;
  user: Observable<firebase.User>;
  public loading: Loading;

  constructor(
    public navCtrl: NavController,
    public menuCtrl: MenuController,
    public loadingCtrl: LoadingController,
    public formBuilder: FormBuilder,
    public afAuth: AngularFireAuth,
    public alertCtrl: AlertController) {

    console.log("entro a loginPage");

    this.myForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });

    this.user = afAuth.authState;
    this.menuCtrl.enable(true, 'myMenu');//para desactivar el menu desplegable en esta pagina
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  loginUsuario() {

    console.log("Email:" + this.myForm.value.email);
    console.log("Password:" + this.myForm.value.password);


    this.afAuth.auth.signInWithEmailAndPassword(this.myForm.value.email, this.myForm.value.password).then(() => {
      console.log("User logging");
      console.log(this.user);
      if (this.myForm.value.email == 'admin@admin.com' && this.myForm.value.password == 'admin123') {
        this.navCtrl.setRoot('AdministradorPage');
      } else {
        this.navCtrl.setRoot('PerfilClientePage');
      };

    }, (err) => {
//renglon original      this.loading.dismiss().then(() => {
      this.loading.dismiss().then(() => {
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
      content: 'Please Wait',
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
      content: 'Please Wait',
      duration: 3500
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();

    this.navCtrl.setRoot('PerfilClientePage');
  }




}
