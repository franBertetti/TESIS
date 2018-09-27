import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DatosPersonalesUsuarioPage } from './datos-personales-usuario';

@NgModule({
  declarations: [
    DatosPersonalesUsuarioPage,
  ],
  imports: [
    IonicPageModule.forChild(DatosPersonalesUsuarioPage),
  ],
})
export class DatosPersonalesUsuarioPageModule {}
