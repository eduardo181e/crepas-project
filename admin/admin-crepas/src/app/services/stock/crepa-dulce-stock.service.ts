import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CrepaDulceStockService {
  API_URI = 'http://localhost:3000/stock/crepaDulce'
  constructor(private http: HttpClient) { }
  // Harinas
  getHarinas(sucursal_id: any){
    return this.http.post((this.API_URI)+ '/H', sucursal_id);
  }

  getHarina(id: any, sucursal_id: any){
    return this.http.post((this.API_URI)+ '/H/'+ id, sucursal_id);
  }

  updateStockHarina(id: any, updatedHarina: any){
    return this.http.put((this.API_URI) + '/H/' + id, updatedHarina);
  }

  // Ingredientes Complementarios
  getIngredientesComplementarios(sucursal_id: any){
    return this.http.post((this.API_URI)+ '/IC', sucursal_id);
  }

  getIngredienteComplementario(id: any, sucursal_id: any){
    return this.http.post((this.API_URI)+ '/IC/'+ id, sucursal_id);
  }

  updateStockIngredienteComplementario(id: any, updatedComplementario: any){
    return this.http.put((this.API_URI) + '/IC/' + id, updatedComplementario);
  }

  // Ingredientes Untables
  getIngredientesUntables(sucursal_id: any){
    return this.http.post((this.API_URI)+ '/IU', sucursal_id);
  }

  getIngredienteUntable(id: any, sucursal_id: any){
    return this.http.post((this.API_URI)+ '/IU/'+ id, sucursal_id);
  }

  updateStockIngredienteUntable(id: any, updatedUntable: any){
    return this.http.put((this.API_URI) + '/IU/' + id, updatedUntable);
  }

  // Nieves
  getNieves(sucursal_id: any){
    return this.http.post((this.API_URI)+ '/N', sucursal_id);
  }

  getNieve(id: any, sucursal_id: any){
    return this.http.post((this.API_URI)+ '/N/'+ id, sucursal_id);
  }

  updateStockNieve(id: any, updatedNieve: any){
    return this.http.put((this.API_URI) + '/N/' + id, updatedNieve);
  }

}
