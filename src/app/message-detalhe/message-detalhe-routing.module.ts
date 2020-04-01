import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageDetalhePage } from './message-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: MessageDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageDetalhePageRoutingModule {}
