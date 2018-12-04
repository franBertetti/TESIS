import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { AngularFireDatabase } from 'angularfire2/database';


interface IUser {
  name: string;
  registration: string;
  email: string;
  isPremium: boolean;
}

export interface Credenciales {
  nombre?: string;
  email?: string;
  imagen?: string;
  uid?: string;
  provider?: string;
}

/*
  Generated class for the UsuarioServicioProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class UsuarioServicioProvider {

  private objetoFoto = new BehaviorSubject({title: 'nuse', description: ' velo'});
//  fotoPerfil = this.

  private messageSource = new BehaviorSubject<string>("default message");
  currentMesagge = this.messageSource.asObservable();

  private objetoDeServicio = new BehaviorSubject({title: 'nuse', description: ' velo'});
  currentObjeto = this.objetoDeServicio.asObservable();

  usuario:any = {title:'nuse' , description:'velo'};

/*  private objeto = new BehaviorSubject<Object>{title:'nuse', description:'velo'};
  objetoActual = this.objeto.asObservable();*/

//  usuario:any = {title:'nuse' , description:'velo'};
  private prueba: BehaviorSubject<any>; 

  private usersSubject = new BehaviorSubject([]);
  private users: IUser[];

  Usuario: Credenciales = {};

  constructor(public http: HttpClient,
    public firebaseNative: Firebase,
    public afDB: AngularFireDatabase,
    public afs: AngularFirestore,
    public afAuth: AngularFireAuth) {
    console.log('Hello UsuarioServicioProvider Provider');

  }

  changeMessage(message: string){
    this.messageSource.next(message);
  }

  /*tomarUrlFotoPerfil(id){
    firebase.storage().ref('FotosUsuario/'+ this.id +'/fotoPerfil.png').getDownloadURL().then((url) => {
      console.log(this.fotoPerfil);
      console.log(url);
      this.fotoPerfil = url;
      console.log(this.fotoPerfil);
    });
  }*/

  changeObject(objeto){
    this.objetoDeServicio.next(objeto);
  }

  imprimirMessage(message:string){
    console.log('mensaje impreso desde servicio:');
    console.log(message);
    this.messageSource.next(message);
  }

   getUsers(): Observable<IUser[]> {
        return this.usersSubject.asObservable();
      }

      private refresh() {
        // Emitir los nuevos valores para que todos los que dependan se actualicen.
        this.usersSubject.next(this.users);
      }

  public tomarDatosUsuarioDesdeDatosPersonalesUsuario(){
    this.usuario = {title:'aaaaaaaaamono', description:'no narnia'};  
  }

  public getValor(): Observable<any> {
    return this.usuario.asObservable;
  }


  cargarUsuario(nombre:string, email:string, imagen:string, uid:string, provider:string){
    this.Usuario.nombre = nombre;
    this.Usuario.email = email;
    this.Usuario.imagen = imagen;
    this.Usuario.uid = uid;
    this.Usuario.provider = provider;
  }
 
}