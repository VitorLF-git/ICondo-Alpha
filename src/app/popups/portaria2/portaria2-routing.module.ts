import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { Portaria2Page } from './portaria2.page';

const routes: Routes = [
  {
    path: '',
    component: Portaria2Page
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class Portaria2PageRoutingModule {}
