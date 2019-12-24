import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredioGaragemPage } from './predio-garagem.page';

const routes: Routes = [
  {
    path: '',
    component: PredioGaragemPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredioGaragemPageRoutingModule {}
