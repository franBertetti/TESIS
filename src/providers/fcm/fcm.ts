import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { Platform } from 'ionic-angular';
import { UsuarioServicioProvider } from '../usuario-servicio/usuario-servicio';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
import firebase from 'firebase';

/*
  Generated class for the FcmProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FcmProvider {

  id;
  usuario:any = {};

  constructor(public http: HttpClient,
             public firebaseNative: Firebase,
             public afs: AngularFirestore,
             private platform: Platform,
             public fireAuth: AngularFireAuth,
             public afDB: AngularFireDatabase,
             public usuarioService: UsuarioServicioProvider) {
    console.log('Hello FcmProvider Provider');
  }

  async getToken(){ // obtiene el token de usuario 
    let token;
  if(this.platform.is('android')){
    token = await this.firebaseNative.getToken();
  } 

  if (this.platform.is('ios')) {
    token = await this.firebaseNative.getToken();
    await this.firebaseNative.grantPermission();
  } 

  if (!this.platform.is('cordova')){}
    
    return this.saveTokenToFirestore(token);
  }

/*Un usuario puede tener muchos dispositivos registrados para notificaciones, por lo que necesitamos un documento
 que preserve la relación entre el usuario y el dispositivo. Esto es tan simple como agregar una userIdpropiedad a
 cada token. Además, un token es solo una cadena, por lo que podemos usarlo como la ID del documento para garantizar
que cada token solo tenga 1 documento. */


public setId(id){
  this.id = id;
  console.log(this.id);
}

public setNuevoEstadoConductor(id, token, nombre, estado){
  const deviceRef = this.afs.collection('conductores')

  const docData = {
    token,
    userId: id,
    nombre: nombre,
    estado: estado
  }

  return deviceRef.doc(id).set(docData);

}


public setEstadoConductor(id, token, nombre){

  const deviceRef = this.afs.collection('conductores')

  //let token = firebase.database().ref('usuarios/'+ id + '/token');
  
  /*firebase.database().ref('usuarios/' + id + '/token').on('child_added', (snapshot) => {  
    let tokenn = snapshot.val(); 
    console.log(tokenn);
  });
  let toke = this.afDB.database.ref('usuarios/' + id + '/token');
  console.log(toke);

  if (!token) return;
  console.log('token:');
  console.log(token);
  console.log('id:');
  console.log(id);
*/
  const docData = {
    token,
    userId: id,
    nombre: nombre,
    estado: 'PendienteAprobacion'
  }
  
  // Add a new document in collection "cities" with ID 'LA'
  return deviceRef.doc(id).set(docData);

  //return deviceRef.doc(id).set({'token': token, 'userId': id, 'estado': 'PendienteAprobacion' });

}


private saveTokenToFirestore(token){ //envia el token a la base de datos de firebase
    if (!token) return;
    const deviceRef = this.afs.collection('devices')

    firebase.database().ref('usuarios/'+ this.id + '/token').set(token);

    const docData = {
      token,
      userId: this.id,
    }

    return deviceRef.doc(token).set(docData);
  }

  listenToNotifications(){ //escuchar los mensajes entrantes cuando la aplicación está abierta
    return this.firebaseNative.onNotificationOpen();
  }
  //lo q es notificacion mientras el usuario usa la app, se maneja con un toaster alert desde el app.component

}