import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredioPerfilPage } from './predio-perfil.page';

const routes: Routes = [
  {
    path: '',
    component: PredioPerfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredioPerfilPageRoutingModule {}
