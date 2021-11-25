import { Component, OnInit } from '@angular/core';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-contactos',
  templateUrl: './contactos.component.html',
  styleUrls: ['./contactos.component.scss']
})
export class ContactosComponent implements OnInit {

  constructor( private contactosService : ContactosService ) {
    contactosService.getContactos()
    .subscribe( resp => {
      console.log(resp);
      
    })
   }

  ngOnInit(): void {
  }

}
