import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredioPage } from './predio.page';

const routes: Routes = [
  {
    path: '',
    component: PredioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredioPageRoutingModule {}
