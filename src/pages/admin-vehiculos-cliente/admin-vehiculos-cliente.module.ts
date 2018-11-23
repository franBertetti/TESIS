import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminVehiculosClientePage } from './admin-vehiculos-cliente';

@NgModule({
  declarations: [
    AdminVehiculosClientePage,
  ],
  imports: [
    IonicPageModule.forChild(AdminVehiculosClientePage),
  ],
})
export class AdminVehiculosClientePageModule {}
