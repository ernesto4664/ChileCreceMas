import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosAllPage } from './beneficios-all.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosAllPageRoutingModule {}
