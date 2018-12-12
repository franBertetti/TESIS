import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { TipoPenalizacionPage } from './tipo-penalizacion';

@NgModule({
  declarations: [
    TipoPenalizacionPage,
  ],
  imports: [
    IonicPageModule.forChild(TipoPenalizacionPage),
  ],
})
export class TipoPenalizacionPageModule {}
