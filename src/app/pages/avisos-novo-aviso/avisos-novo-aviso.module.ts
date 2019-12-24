import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AvisosNovoAvisoPageRoutingModule } from './avisos-novo-aviso-routing.module';

import { AvisosNovoAvisoPage } from './avisos-novo-aviso.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AvisosNovoAvisoPageRoutingModule
  ],
  declarations: [AvisosNovoAvisoPage]
})
export class AvisosNovoAvisoPageModule {}
