import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ViajeSeleccionadoPage } from './viaje-seleccionado';

@NgModule({
  declarations: [
    ViajeSeleccionadoPage,
  ],
  imports: [
    IonicPageModule.forChild(ViajeSeleccionadoPage),
  ],
})
export class ViajeSeleccionadoPageModule {}
