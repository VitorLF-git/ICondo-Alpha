import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FirstAcessPage } from './first-acess.page';

const routes: Routes = [
  {
    path: '',
    component: FirstAcessPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FirstAcessPageRoutingModule {}
