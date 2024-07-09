import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuestHomePage } from './guest-home.page';

const routes: Routes = [
  {
    path: '',
    component: GuestHomePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestHomePageRoutingModule {}
