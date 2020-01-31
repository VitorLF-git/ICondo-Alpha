import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PortariaConfirmationPageRoutingModule } from './portaria-confirmation-routing.module';

import { PortariaConfirmationPage } from './portaria-confirmation.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortariaConfirmationPageRoutingModule
  ],
  declarations: [PortariaConfirmationPage]
})
export class PortariaConfirmationPageModule {}
