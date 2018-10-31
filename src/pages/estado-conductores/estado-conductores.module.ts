import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EstadoConductoresPage } from './estado-conductores';

@NgModule({
  declarations: [
    EstadoConductoresPage,
  ],
  imports: [
    IonicPageModule.forChild(EstadoConductoresPage),
  ],
})
export class EstadoConductoresPageModule {}
