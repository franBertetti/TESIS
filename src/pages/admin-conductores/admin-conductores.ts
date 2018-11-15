import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading } from 'ionic-angular';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';
import { DetalleConductorPage } from '../detalle-conductor/detalle-conductor';

/**
 * Generated class for the AdminConductoresPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */
//
@IonicPage()
@Component({
  selector: 'page-admin-conductores',
  templateUrl: 'admin-conductores.html',
})
export class AdminConductoresPage {

  usuarios = [];
  conductores:any = [];
  database:any;
  cont = 0;
  arrayObj = [];

  constructor(
    public loadingCtrl: LoadingController,
    public navCtrl: NavController, public navParams: NavParams,public afDB: AngularFireDatabase) {
    this.getUsuarios()
      .valueChanges().subscribe(usuariosGuardados => {
        this.conductores = usuariosGuardados;
        console.log(this.conductores);
      });
      console.log("conductores"+this.conductores);
      this.database = firebase.database();
    
      firebase.database().ref('usuarios/').orderByChild('nombreCompleto').on('value', (snapshot) => {
        let users = [];
        snapshot.forEach( snap => {
          let q = snap.val();
          if (q.nombreCompleto != 'admin'){
          users.push(snap.val()); //or snap.val().name if you just want the name and not the whole object
          this.arrayObj[this.cont] = snap.val();
          this.cont++;
          console.log(users);
          }
        });
      });
    
    }

  public getUsuarios(){
    return this.afDB.list('usuarios/');
}

  ionViewDidLoad() {
    console.log('ionViewDidLoad AdminConductoresPage');
  }

  irADetalleConductor(id){
    let loading = this.loadingCtrl.create({
      spinner: 'crescent',
      content: 'Please Wait',
      duration: 3000
    });

    loading.onDidDismiss(() => {
      console.log('Dismissed loading');
    });

    loading.present();
    
    this.navCtrl.push(DetalleConductorPage, {id:id});
  }

}