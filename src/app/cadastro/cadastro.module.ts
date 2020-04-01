import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IonicModule } from '@ionic/angular';

import { CadastroPageRoutingModule } from './cadastro-routing.module';

import { CadastroPage } from './cadastro.page';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';



@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    CadastroPageRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  declarations: [CadastroPage]
})
export class CadastroPageModule {}
