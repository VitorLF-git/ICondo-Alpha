import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortariaNovoAvisoPageRoutingModule } from './portaria-novo-aviso-routing.module';

import { PortariaNovoAvisoPage } from './portaria-novo-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortariaNovoAvisoPageRoutingModule
  ],
  declarations: [PortariaNovoAvisoPage]
})
export class PortariaNovoAvisoPageModule {}
