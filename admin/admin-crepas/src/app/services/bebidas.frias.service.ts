import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { bebida } from '../models/bebida'

@Injectable({
  providedIn: 'root'
})
export class BebidasFriasService {

  API_URI = 'http://localhost:3000/bebidasFrias'
  constructor(private http: HttpClient) { }
  getBebidas(){
    return this.http.get((this.API_URI));
  }

  getBebida(id: any){
    return this.http.get((this.API_URI)+ '/'+ id);
  }

  deleteBebida(id: any){
    return this.http.delete((this.API_URI)+ '/'+ id);
  }

  saveBebida(game: bebida){
    return this.http.post((this.API_URI), game);
  }

  updateBebida(id: string|number|any, updatedGame: bebida): Observable<bebida>{
    return this.http.put((this.API_URI) + '/' + id, updatedGame);
  }
}
