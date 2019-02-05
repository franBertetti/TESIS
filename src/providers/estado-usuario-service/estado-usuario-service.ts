import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { Component, Query } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Loading,  MenuController } from 'ionic-angular';
import { AngularFireDatabase, snapshotChanges } from 'angularfire2/database';
import firebase from 'firebase';

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


  buscarEstadoConductores() {

    return new Promise((resolve, reject) => {

      var usuarios:any = [];
    
    firebase.database().ref('conductor/').orderByChild('estado').on('child_added', (snapshot) => {

      let userRef = firebase.database().ref('usuarios/' + snapshot.key);
        var evaluarEstado = snapshot.val();
        if (evaluarEstado.estado != "-" && evaluarEstado.estado) {
        //this.estados.push(snapshot.val());
        userRef.on('value', userSnap => {
          var value = userSnap.val();
          var val  = snapshot.val();
          value.estado = val.estado;
          if (value.estado == 'PendienteAprobacion'){ value.color = '#E88E0C' };
          if (value.estado == 'Aprobado'){ value.color = '#32db64' };
          if (value.estado == 'DadoDeBaja'){ value.color = '#f53d3d' };
          if (value.estado == 'EnLinea'){ value.color = '#488aff' };
          if (value.estado == 'FueraDeLinea'){ value.color = '#0F0CD1' };
          if (value.estado == 'NoAprobado'){ value.color = '#E80028' };
          if (value.estado == 'Ocupado'){ value.color = '#D1970A' };
          //console.log(userSnap.val()); // trae bien los datos del usuari
          usuarios.push(value);
        });
      } 
    });

    console.log(usuarios);
    console.log(usuarios.length);
    resolve({'usuarios': usuarios, 'cant': usuarios.length});
  });

  }


}

