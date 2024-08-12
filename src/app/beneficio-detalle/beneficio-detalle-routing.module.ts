import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficioDetallePage } from './beneficio-detalle.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficioDetallePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficioDetallePageRoutingModule {}
