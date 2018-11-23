import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleVehiculosClientePage } from './detalle-vehiculos-cliente';

@NgModule({
  declarations: [
    DetalleVehiculosClientePage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleVehiculosClientePage),
  ],
})
export class DetalleVehiculosClientePageModule {}
