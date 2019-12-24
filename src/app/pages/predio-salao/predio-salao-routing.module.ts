import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredioSalaoPage } from './predio-salao.page';

const routes: Routes = [
  {
    path: '',
    component: PredioSalaoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredioSalaoPageRoutingModule {}
