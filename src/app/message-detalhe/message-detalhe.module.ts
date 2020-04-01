import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageDetalhePageRoutingModule } from './message-detalhe-routing.module';

import { MessageDetalhePage } from './message-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageDetalhePageRoutingModule
  ],
  declarations: [MessageDetalhePage]
})
export class MessageDetalhePageModule {}
