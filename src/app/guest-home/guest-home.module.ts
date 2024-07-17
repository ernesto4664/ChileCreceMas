import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { GuestHomePageRoutingModule } from './guest-home-routing.module';
import { GuestHomePage } from './guest-home.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuestHomePageRoutingModule
  ],
  declarations: [GuestHomePage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]  // Agrega esta línea
})
export class GuestHomePageModule {}
