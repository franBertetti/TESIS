import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AdminConductoresPage } from './admin-conductores';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';


@NgModule({
  declarations: [
    AdminConductoresPage,
  ],
  imports: [
    IonicPageModule.forChild(AdminConductoresPage),
    NgxDatatableModule
  ],
})
export class AdminConductoresPageModule {}
