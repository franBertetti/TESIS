import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AyudaPage } from './ayuda';
import { ComponentsModule } from "../../components/components.module";


@NgModule({
  declarations: [
    AyudaPage,
  ],
  imports: [
    IonicPageModule.forChild(AyudaPage),
    ComponentsModule
  ],
})
export class AyudaPageModule {}
