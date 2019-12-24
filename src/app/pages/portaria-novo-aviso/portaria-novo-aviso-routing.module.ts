import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PortariaNovoAvisoPage } from './portaria-novo-aviso.page';

const routes: Routes = [
  {
    path: '',
    component: PortariaNovoAvisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PortariaNovoAvisoPageRoutingModule {}
