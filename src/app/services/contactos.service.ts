import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ContactosResponse } from '../Interface/Contactos.response';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private http: HttpClient ) { }

  getContactos(){
    return this.http.get<any>(`${BASE_URL}/api/contactos`);
  }

  getContactoById(id: string){
    return this.http.get<ContactosResponse>(`${BASE_URL}/api/contactos/${id}`);
  }

  filtroContactos(value: string){
    return this.http.get<ContactosResponse[]>(`${BASE_URL}/api/contactos/filtro`, {
      params: {
        nombre: value
      }
    });
  }

  postContacto(data: any){
    return this.http.post(`${BASE_URL}/api/contactos`, data);
  }

  putContacto(data: any, id: string){
    return this.http.put(`${BASE_URL}/api/contactos/${id}`, data);
  }

  deleteContacto(id: string){
    return this.http.delete(`${BASE_URL}/api/contactos/${id}`);
  }

}
