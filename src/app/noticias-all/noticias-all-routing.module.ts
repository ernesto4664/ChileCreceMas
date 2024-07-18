import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NoticiasAllPage } from './noticias-all.page';

const routes: Routes = [
  {
    path: '',
    component: NoticiasAllPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NoticiasAllPageRoutingModule {}
