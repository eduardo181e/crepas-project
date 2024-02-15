import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BebidasFriasSalesService {
  API_URI = 'http://localhost:3000/sales/bebidasFrias'
  constructor(private http: HttpClient) { }
  getBebidasFrias(sucursal_id: any){
    return this.http.post((this.API_URI), sucursal_id);
  }

  getBebidaFria(id: any){
    return this.http.get((this.API_URI)+ '/'+ id);
  }

  lapsSaleBebidaFria(sucursal_id: any){
    return this.http.post((this.API_URI)+'/laps', sucursal_id);
  }
}
