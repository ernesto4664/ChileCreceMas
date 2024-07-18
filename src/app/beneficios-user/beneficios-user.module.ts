import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosUserPageRoutingModule } from './beneficios-user-routing.module';

import { BeneficiosUserPage } from './beneficios-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosUserPageRoutingModule
  ],
  declarations: [BeneficiosUserPage]
})
export class BeneficiosUserPageModule {}
