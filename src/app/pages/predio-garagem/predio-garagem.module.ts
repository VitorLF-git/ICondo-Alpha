import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioGaragemPageRoutingModule } from './predio-garagem-routing.module';

import { PredioGaragemPage } from './predio-garagem.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioGaragemPageRoutingModule
  ],
  declarations: [PredioGaragemPage]
})
export class PredioGaragemPageModule {}
