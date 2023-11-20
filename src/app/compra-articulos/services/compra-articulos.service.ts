import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { dataArticulesCarritoRegistered, dataArticulesRegistered } from 'src/app/interfaces/data-json.interfces';
import { newCarrito, updateArticuloCarrito } from 'src/app/interfaces/formNewArticule.interfaces';
import { SuccessRequest } from 'src/app/interfaces/response-request.interfaces';
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

  public solicitaRegistraArticulo(data: newCarrito): Observable<SuccessRequest>{
    return this.httpRequestArticulos.solicitaRegistraCarrito(data);
  }

  public solicitaArticulosCarrito(numPage: number): Observable<dataArticulesCarritoRegistered> {
    return this.httpRequestArticulos.solicitaAriculosCarrito(numPage);
  }

  public eliminaCarrito(): Observable<SuccessRequest>{
    return this.httpRequestArticulos.solicitaEliminarCarrito();
  }

  public eliminaArticuloCarrito(id: number): Observable<SuccessRequest>{
    return this.httpRequestArticulos.solicitaEliminaArticuloCarrito(id);
  }

  public actualizaArticuloCarrito(data: updateArticuloCarrito): Observable<SuccessRequest> {
    return this.httpRequestArticulos.solicitaActualizarArticuloCarrito(data);
  }
}
