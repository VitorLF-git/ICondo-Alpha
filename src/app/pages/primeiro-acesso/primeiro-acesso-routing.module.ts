import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PrimeiroAcessoPage } from './primeiro-acesso.page';

const routes: Routes = [
  {
    path: '',
    component: PrimeiroAcessoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrimeiroAcessoPageRoutingModule {}
