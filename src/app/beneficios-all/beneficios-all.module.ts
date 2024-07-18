import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficiosAllPageRoutingModule } from './beneficios-all-routing.module';

import { BeneficiosAllPage } from './beneficios-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficiosAllPageRoutingModule
  ],
  declarations: [BeneficiosAllPage]
})
export class BeneficiosAllPageModule {}
