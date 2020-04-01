import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabsPage } from './tabs.page';

const routes: Routes = [
  {
    path: '',
    component: TabsPage,
    children:
    [
      {
        path: 'crm',
        loadChildren: () => import('../crm/crm.module').then( m => m.CrmPageModule)
      },
      {
        path: 'favoritos',
        loadChildren: () => import('../favoritos/favoritos.module').then( m => m.FavoritosPageModule)
      },
      {
        path: 'message',
        loadChildren: () => import('../message/message.module').then( m => m.MessagePageModule)
      },
      {
        path: 'user',
        loadChildren: () => import('../user/user.module').then( m => m.UserPageModule)
      },
      {
        path: 'sair',
        redirectTo: '/home'
      },
      {
        path: '',
        redirectTo: '/tabs/crm',
        pathMatch: 'full'
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabsPageRoutingModule {}
