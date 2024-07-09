import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MifamiliaPage } from './mifamilia.page';

const routes: Routes = [
  {
    path: '',
    component: MifamiliaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MifamiliaPageRoutingModule {}
