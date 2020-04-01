import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrmDetalhePageRoutingModule } from './crm-detalhe-routing.module';

import { CrmDetalhePage } from './crm-detalhe.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrmDetalhePageRoutingModule
  ],
  declarations: [CrmDetalhePage]
})
export class CrmDetalhePageModule {}
