import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class ContactosService {

  constructor(private http: HttpClient ) { }

  getContactos(){
    return this.http.get(`${BASE_URL}/api/contactos`);
  }

}
