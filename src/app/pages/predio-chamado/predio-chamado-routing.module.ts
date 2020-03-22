import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredioChamadoPage } from './predio-chamado.page';

const routes: Routes = [
  {
    path: '',
    component: PredioChamadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredioChamadoPageRoutingModule {}
