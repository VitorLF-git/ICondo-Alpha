import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/app/predio',
    pathMatch: 'full'

  },

  {
    path: '',
    component: TabsPage,
    children: [
      {
        path: 'predio',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/predio/predio.module').then(m => m.PredioPageModule)
          },
          {
            path: 'info',
            loadChildren: () =>
              import('../pages/predio-perfil/predio-perfil.module').then(m => m.PredioPerfilPageModule)
          },
          {
            path: 'garagem',
            loadChildren: () =>
              import('../pages/predio-garagem/predio-garagem.module').then(m => m.PredioGaragemPageModule)
          },
          {
            path: 'salao',
            loadChildren: () =>
              import('../pages/predio-salao/predio-salao.module').then(m => m.PredioSalaoPageModule)
          }
        ]
      },
      {
        path: 'portaria',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/portaria/portaria.module').then(m => m.PortariaPageModule)
          }
        ]
      },
      {
        path: 'avisos',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../pages/avisos/avisos.module').then(m => m.AvisosPageModule)
          },
          {
            path: 'novo',
            loadChildren: () =>
              import('../pages/avisos-novo-aviso/avisos-novo-aviso.module').then(m => m.AvisosNovoAvisoPageModule)
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TabsPageRoutingModule { }
