import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BuscarConductorPage } from './buscar-conductor';

@NgModule({
  declarations: [
    BuscarConductorPage,
  ],
  imports: [
    IonicPageModule.forChild(BuscarConductorPage),
  ],
})
export class BuscarConductorPageModule {}
