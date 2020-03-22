import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PredioChamadoNovoChamadoPage } from './predio-chamado-novo-chamado.page';

const routes: Routes = [
  {
    path: '',
    component: PredioChamadoNovoChamadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PredioChamadoNovoChamadoPageRoutingModule {}
