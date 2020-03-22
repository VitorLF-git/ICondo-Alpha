import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioChamadoNovoChamadoPageRoutingModule } from './predio-chamado-novo-chamado-routing.module';

import { PredioChamadoNovoChamadoPage } from './predio-chamado-novo-chamado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioChamadoNovoChamadoPageRoutingModule
  ],
  declarations: [PredioChamadoNovoChamadoPage]
})
export class PredioChamadoNovoChamadoPageModule {}
