import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactosComponent } from './contactos.component';
import { ListaContactosComponent } from './lista-contactos/lista-contactos.component';
import { NuevoContactoComponent } from './nuevo-contacto/nuevo-contacto.component';

const routes: Routes = [
    { path: '', component: ContactosComponent, 
    children: [
      { path: 'lista', component: ListaContactosComponent },
      { path: 'lista/:id', component: ListaContactosComponent },
      { path: 'nuevo', component: NuevoContactoComponent }
    ] },
    
    
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactosRoutingModule { }
