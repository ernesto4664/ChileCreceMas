import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BeneficiosUserPage } from './beneficios-user.page';

const routes: Routes = [
  {
    path: '',
    component: BeneficiosUserPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BeneficiosUserPageRoutingModule {}
