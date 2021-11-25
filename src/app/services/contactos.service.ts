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

}
