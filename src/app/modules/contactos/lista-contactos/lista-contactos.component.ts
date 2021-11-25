import { Component, OnInit } from '@angular/core';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.scss']
})
export class ListaContactosComponent implements OnInit {

  public contactos : ContactosResponse[] = [];

  constructor( private contactosService : ContactosService ) {

    contactosService.getContactos()
    .subscribe( (resp: any[]) => {
      
      this.contactos = resp;
      console.log(this.contactos);
      
    });
    
   }

  ngOnInit(): void {
  }
}
