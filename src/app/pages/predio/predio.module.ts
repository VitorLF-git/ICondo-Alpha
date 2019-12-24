import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioPageRoutingModule } from './predio-routing.module';

import { PredioPage } from './predio.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioPageRoutingModule
  ],
  declarations: [PredioPage]
})
export class PredioPageModule {}
