import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PenalizacionesPage } from './penalizaciones';

@NgModule({
  declarations: [
    PenalizacionesPage,
  ],
  imports: [
    IonicPageModule.forChild(PenalizacionesPage),
  ],
})
export class PenalizacionesPageModule {}
