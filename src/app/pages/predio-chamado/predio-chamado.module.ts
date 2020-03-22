import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioChamadoPageRoutingModule } from './predio-chamado-routing.module';

import { PredioChamadoPage } from './predio-chamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioChamadoPageRoutingModule
  ],
  declarations: [PredioChamadoPage]
})
export class PredioChamadoPageModule {}
