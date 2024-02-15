import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class WaffleSalesService {
  API_URI = 'http://localhost:3000/sales/waffles'
  constructor(private http: HttpClient) { }

  // Ingredientes Complementarios
  getIngredientesComplementarios(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IC/', sucursal_id);
  }

  getIngredienteComplementario(id: any){
    return this.http.get((this.API_URI)+ '/IC/'+ id);
  }

  lapsSalesIngredientesComplementarios(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IC/laps', sucursal_id);
  }

  // Ingredientes Untables
  getIngredientesUntables(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IU/', sucursal_id);
  }

  getIngredienteUntable(id: any){
    return this.http.get((this.API_URI)+ '/IU/'+ id);
  }

  lapsSalesIngredientesUntables(sucursal_id: any){
    return this.http.post((this.API_URI)+'/IU/laps', sucursal_id);
  }

  // Nieves
  getNieves(sucursal_id: any){
    return this.http.post((this.API_URI)+'/N/', sucursal_id);
  }

  getNieve(id: any){
    return this.http.get((this.API_URI)+ '/N/'+ id);
  }

  lapsSalesNieves(sucursal_id: any){
    return this.http.post((this.API_URI)+'/N/laps', sucursal_id);
  }
}
