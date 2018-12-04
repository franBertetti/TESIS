import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoBusquedaPage } from './resultado-busqueda';
import { NgxDatatableModule } from '@swimlane/ngx-datatable';

@NgModule({
  declarations: [
    ResultadoBusquedaPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoBusquedaPage),
    NgxDatatableModule
  ],
})
export class ResultadoBusquedaPageModule {}
