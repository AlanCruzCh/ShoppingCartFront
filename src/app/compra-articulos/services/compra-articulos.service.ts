import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataArticulesRegistered } from 'src/app/interfaces/data-json.interfces';
import { HttpRequestArticulosService } from 'src/app/services/http-request-articulos.service';

@Injectable({
  providedIn: 'root'
})
export class CompraArticulosService {

  constructor(
    private httpRequestArticulos: HttpRequestArticulosService
  ) { }

  public buscaArticulosRegistrados(clave: string, page: number): Observable<dataArticulesRegistered>{
    return this.httpRequestArticulos.solicitaArticulosDisponibles(clave, page);
  }

}
