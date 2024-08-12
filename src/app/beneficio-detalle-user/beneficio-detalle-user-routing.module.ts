import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficioDetalleUserPage } from './beneficio-detalle-user.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficioDetalleUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficioDetalleUserPageRoutingModule {}
