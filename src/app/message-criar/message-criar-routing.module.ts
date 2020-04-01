import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MessageCriarPage } from './message-criar.page';

const routes: Routes = [
  {
    path: '',
    component: MessageCriarPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MessageCriarPageRoutingModule {}
