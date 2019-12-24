import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortariaPageRoutingModule } from './portaria-routing.module';

import { PortariaPage } from './portaria.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortariaPageRoutingModule
  ],
  declarations: [PortariaPage]
})
export class PortariaPageModule {}
