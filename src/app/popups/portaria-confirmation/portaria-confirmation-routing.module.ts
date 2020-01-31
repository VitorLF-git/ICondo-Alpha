import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortariaConfirmationPage } from './portaria-confirmation.page';

const routes: Routes = [
  {
    path: '',
    component: PortariaConfirmationPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortariaConfirmationPageRoutingModule {}
