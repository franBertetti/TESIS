import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SolicitudesConductorPage } from './solicitudes-conductor';

@NgModule({
  declarations: [
    SolicitudesConductorPage,
  ],
  imports: [
    IonicPageModule.forChild(SolicitudesConductorPage),
  ],
})
export class SolicitudesConductorPageModule {}
