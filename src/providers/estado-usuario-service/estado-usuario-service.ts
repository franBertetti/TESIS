import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
/*
  Generated class for the EstadoUsuarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstadoUsuarioServiceProvider {

  constructor(public http: HttpClient,
             public firebaseNative: Firebase,
             public afs: AngularFirestore,
              private platform: Platform) {
    console.log('Hello FcmProvider Provider');
  }

  public holaMundo(){
    console.log('hola desde estadoUsuario');
  }

}

