import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

const BASE_URL = environment.BASE_URL;

@Injectable({
  providedIn: 'root'
})
export class CorreosService {

  constructor( private http: HttpClient ) { }

  getCorreos(id: string){
    return this.http.get<any>(`${BASE_URL}/api/correos/${id}`);
  }

  putCorreo(contactoId: string, correoId: number, correoActualizado: any){
    return this.http.put<any>(`${BASE_URL}/api/correos/${contactoId}/${correoId}`, correoActualizado);
  }

}
