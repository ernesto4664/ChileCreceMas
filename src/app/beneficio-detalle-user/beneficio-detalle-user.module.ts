import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BeneficioDetalleUserPageRoutingModule } from './beneficio-detalle-user-routing.module';

import { BeneficioDetalleUserPage } from './beneficio-detalle-user.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BeneficioDetalleUserPageRoutingModule
  ],
  declarations: [BeneficioDetalleUserPage]
})
export class BeneficioDetalleUserPageModule {}
