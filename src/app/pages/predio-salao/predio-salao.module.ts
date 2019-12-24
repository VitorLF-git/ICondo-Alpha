import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioSalaoPageRoutingModule } from './predio-salao-routing.module';

import { PredioSalaoPage } from './predio-salao.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioSalaoPageRoutingModule
  ],
  declarations: [PredioSalaoPage]
})
export class PredioSalaoPageModule {}
