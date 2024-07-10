import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MifamiliaPageRoutingModule } from './mifamilia-routing.module';
import { MifamiliaPage } from './mifamilia.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,  // Agrega ReactiveFormsModule aquí también
    MifamiliaPageRoutingModule
  ],
  declarations: [MifamiliaPage]
})
export class MifamiliaPageModule {}
