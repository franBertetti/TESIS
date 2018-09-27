import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ResultadoBusquedaPage } from './resultado-busqueda';

@NgModule({
  declarations: [
    ResultadoBusquedaPage,
  ],
  imports: [
    IonicPageModule.forChild(ResultadoBusquedaPage),
  ],
})
export class ResultadoBusquedaPageModule {}
