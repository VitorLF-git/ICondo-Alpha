import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioPerfilPageRoutingModule } from './predio-perfil-routing.module';

import { PredioPerfilPage } from './predio-perfil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioPerfilPageRoutingModule
  ],
  declarations: [PredioPerfilPage]
})
export class PredioPerfilPageModule {}
