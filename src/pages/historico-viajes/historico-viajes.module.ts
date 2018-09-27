import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HistoricoViajesPage } from './historico-viajes';

@NgModule({
  declarations: [
    HistoricoViajesPage,
  ],
  imports: [
    IonicPageModule.forChild(HistoricoViajesPage),
  ],
})
export class HistoricoViajesPageModule {}
