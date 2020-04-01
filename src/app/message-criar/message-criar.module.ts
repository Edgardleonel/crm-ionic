import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MessageCriarPageRoutingModule } from './message-criar-routing.module';

import { MessageCriarPage } from './message-criar.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MessageCriarPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [MessageCriarPage]
})
export class MessageCriarPageModule {}
