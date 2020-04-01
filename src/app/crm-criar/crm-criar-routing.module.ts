import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CrmCriarPage } from './crm-criar.page';

const routes: Routes = [
  {
    path: '',
    component: CrmCriarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CrmCriarPageRoutingModule {}
