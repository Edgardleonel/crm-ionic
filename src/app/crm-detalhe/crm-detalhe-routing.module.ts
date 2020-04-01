import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrmDetalhePage } from './crm-detalhe.page';

const routes: Routes = [
  {
    path: '',
    component: CrmDetalhePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmDetalhePageRoutingModule {}
