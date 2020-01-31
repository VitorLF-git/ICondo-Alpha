import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { Portaria2PageRoutingModule } from './portaria2-routing.module';

import { Portaria2Page } from './portaria2.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    Portaria2PageRoutingModule
  ],
  declarations: [Portaria2Page]
})
export class Portaria2PageModule {}
