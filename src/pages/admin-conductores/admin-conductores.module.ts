import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminConductoresPage } from './admin-conductores';

@NgModule({
  declarations: [
    AdminConductoresPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminConductoresPage),
  ],
})
export class AdminConductoresPageModule {}
