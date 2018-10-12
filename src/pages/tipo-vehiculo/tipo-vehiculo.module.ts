import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoVehiculoPage } from './tipo-vehiculo';

@NgModule({
  declarations: [
    TipoVehiculoPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoVehiculoPage),
  ],
})
export class TipoVehiculoPageModule {}
