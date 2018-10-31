import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { DetalleConductorPage } from './detalle-conductor';

@NgModule({
  declarations: [
    DetalleConductorPage,
  ],
  imports: [
    IonicPageModule.forChild(DetalleConductorPage),
  ],
})
export class DetalleConductorPageModule {}
