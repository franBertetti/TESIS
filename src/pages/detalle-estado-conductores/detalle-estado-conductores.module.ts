import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleEstadoConductoresPage } from './detalle-estado-conductores';

@NgModule({
  declarations: [
    DetalleEstadoConductoresPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleEstadoConductoresPage),
  ],
})
export class DetalleEstadoConductoresPageModule {}
