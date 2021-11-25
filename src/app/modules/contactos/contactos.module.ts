import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactosComponent } from './contactos.component';
import { ContactosRoutingModule } from './contactos.routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ListaContactosComponent } from './lista-contactos/lista-contactos.component';
import { NuevoContactoComponent } from './nuevo-contacto/nuevo-contacto.component';
import { ReactiveFormsModule } from '@angular/forms';
import { EditarContactoComponent } from './editar-contacto/editar-contacto.component';



@NgModule({
  declarations: [
    ContactosComponent,
    ListaContactosComponent,
    NuevoContactoComponent,
    EditarContactoComponent
  ],
  imports: [
    CommonModule,
    ContactosRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ]
})
export class ContactosModule { }
