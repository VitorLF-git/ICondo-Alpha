import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FirstAcessPageRoutingModule } from './first-acess-routing.module';

import { FirstAcessPage } from './first-acess.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FirstAcessPageRoutingModule
  ],
  declarations: [FirstAcessPage]
})
export class FirstAcessPageModule {}
