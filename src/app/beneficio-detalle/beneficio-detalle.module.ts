import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficioDetallePageRoutingModule } from './beneficio-detalle-routing.module';

import { BeneficioDetallePage } from './beneficio-detalle.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficioDetallePageRoutingModule
  ],
  declarations: [BeneficioDetallePage]
})
export class BeneficioDetallePageModule {}
