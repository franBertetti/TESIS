import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
/*
  Generated class for the EstadoUsuarioServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class EstadoUsuarioServiceProvider {
  constructor(public http: HttpClient) {
    console.log('Hello EstadoUsuarioServiceProvider Provider');
  }

  public holaMundo(){
    console.log('hola desde estadoUsuario');
  }

}