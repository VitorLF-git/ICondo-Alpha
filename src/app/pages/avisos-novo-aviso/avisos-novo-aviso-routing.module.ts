import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AvisosNovoAvisoPage } from './avisos-novo-aviso.page';

const routes: Routes = [
  {
    path: '',
    component: AvisosNovoAvisoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AvisosNovoAvisoPageRoutingModule {}
