import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CrmCriarPageRoutingModule } from './crm-criar-routing.module';

import { CrmCriarPage } from './crm-criar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CrmCriarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [CrmCriarPage]
})
export class CrmCriarPageModule {}
