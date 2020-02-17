import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PredioSalaoPageRoutingModule } from './predio-salao-routing.module';

import { PredioSalaoPage } from './predio-salao.page';

import { NgCalendarModule  } from 'ionic2-calendar';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PredioSalaoPageRoutingModule,
    NgCalendarModule
  ],
  declarations: [PredioSalaoPage]
})
export class PredioSalaoPageModule {}
