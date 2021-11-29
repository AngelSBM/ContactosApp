import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class TelefonosService {

  constructor(private http: HttpClient ) { }

  getTelefonos(id: string){
    return this.http.get<any>(`${BASE_URL}/api/telefonos/${id}`);
  }
}
