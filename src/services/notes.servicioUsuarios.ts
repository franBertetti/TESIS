import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';


@Injectable()
export class servicioUsuarios{

    constructor(public afDB: AngularFireDatabase) {}

    usuarios = {};

    public registrarUsuario(usuario){
        this.afDB.database.ref('usuarios/'+usuario.id).set(usuario);
    }
}

