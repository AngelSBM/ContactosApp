import { Component, OnInit } from '@angular/core';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  public contactos : ContactosResponse[] = [];

  constructor( private contactosService : ContactosService ) {

    contactosService.getContactos()
    .subscribe( (resp) => {
      
      this.contactos = resp;
      console.log(this.contactos);
      
    });
    
   }

  ngOnInit(): void {
  }

}
