import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { InicioViajePage } from './inicio-viaje';

@NgModule({
  declarations: [
    InicioViajePage,
  ],
  imports: [
    IonicPageModule.forChild(InicioViajePage),
  ],
})
export class InicioViajePageModule {}
