import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BebidasFriasStockService {
  API_URI = 'http://localhost:3000/stock/bebidasFrias'
  constructor(private http: HttpClient) {}
  getBebidasFrias(sucursal_id: any){
    return this.http.post((this.API_URI), sucursal_id);
  }

  getBebidaFria(id: any, sucursal_id:any){
    return this.http.post((this.API_URI)+ '/'+ id, sucursal_id);
  }

  updateStockBebidaFria(id: any, updatedBebida: any){
    return this.http.put((this.API_URI) + '/' + id, updatedBebida);
  }
}
