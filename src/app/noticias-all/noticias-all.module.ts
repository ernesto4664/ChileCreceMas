import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NoticiasAllPageRoutingModule } from './noticias-all-routing.module';

import { NoticiasAllPage } from './noticias-all.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasAllPageRoutingModule
  ],
  declarations: [NoticiasAllPage]
})
export class NoticiasAllPageModule {}
