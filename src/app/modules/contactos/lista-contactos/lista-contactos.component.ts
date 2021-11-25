import { Component, OnInit } from '@angular/core';
import { ContactosResponse } from 'src/app/Interface/Contactos.response';
import { ContactosService } from 'src/app/services/contactos.service';

@Component({
  selector: 'app-lista-contactos',
  templateUrl: './lista-contactos.component.html',
  styleUrls: ['./lista-contactos.component.scss']
})
export class ListaContactosComponent implements OnInit {

  public searchValue: string = "";
  public contactos : ContactosResponse[] = []
  public contactosList : ContactosResponse[] = [];

  constructor( private contactosService : ContactosService ) {

    contactosService.getContactos()
    .subscribe( (resp: any[]) => {
      
      this.contactos = resp;
      this.contactosList = resp;
      console.log(this.contactos);
      
    });
    
   }

  ngOnInit(): void {
  }

  search(){    
    this.contactosService.filtroContactos(this.searchValue)
      .subscribe(resp => {
        this.contactos = resp;        
      })

  if(this.searchValue == ""){
    this.contactos = this.contactosList
  }
    
  }
}
