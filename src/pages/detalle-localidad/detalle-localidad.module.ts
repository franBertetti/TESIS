import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleLocalidadPage } from './detalle-localidad';

@NgModule({
  declarations: [
    DetalleLocalidadPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleLocalidadPage),
  ],
})
export class DetalleLocalidadPageModule {}
