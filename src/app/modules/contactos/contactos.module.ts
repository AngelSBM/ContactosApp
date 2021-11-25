import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactosComponent } from './contactos.component';
import { ContactosRoutingModule } from './contactos.routing.module';
import { HttpClientModule } from '@angular/common/http';



@NgModule({
  declarations: [
    ContactosComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    HttpClientModule
  ]
})
export class ContactosModule { }
