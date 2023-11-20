import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environments } from 'src/environments/environments';

import { newArticule, newCarrito, updateArticuloCarrito } from '../interfaces/formNewArticule.interfaces';
import { SuccessRequest } from '../interfaces/response-request.interfaces';
import { DataJSONShowCarrito, dataArticulesCarritoRegistered, dataArticulesRegistered, dataJsonShowArticules } from '../interfaces/data-json.interfces';


@Injectable({
  providedIn: 'root'
})
export class HttpRequestArticulosService {

  private servidorUrl = environments.servidorUrl;

  constructor(
    private http: HttpClient
  ) { }

  public solicitaRegistrorticulo( data: newArticule ): Observable<SuccessRequest> {
    return this.registraArticulo(data);
  }

  private registraArticulo( data: newArticule ): Observable<SuccessRequest> {
    const urlPeticion = `${this.servidorUrl}/new/articule`;
    return this.http.post<SuccessRequest>(urlPeticion, data);
  }

  public solicitaArticulosDisponibles(palabraClave: string, numPage: number): Observable<dataArticulesRegistered>{
    return this.buscaArticulosDisponibles(palabraClave, numPage);
  }

  private buscaArticulosDisponibles(palabraClave: string, numPage: number): Observable<dataArticulesRegistered>{
    let clave = palabraClave;
    if (clave === '') {
      clave = '\'\'';
    }
    const urlPeticion = `${this.servidorUrl}/lista/articulos/${clave}/page/${numPage}`;
    return this.http.get<dataJsonShowArticules>(urlPeticion).pipe(
      map ( (data: dataJsonShowArticules) => {
        const dataResponse: dataArticulesRegistered = {
          content:data.content,
          pageNumber: data.pageable.pageNumber,
          pageSize: data.pageable.pageSize,
          totalElements: data.totalElements,
          totalPages: data.totalPages
        }
        return dataResponse;
      })
    );
  }

  public solicitaRegistraCarrito(data: newCarrito): Observable<SuccessRequest>{
    return this.registraCarrito(data);
  }

  private registraCarrito(data: newCarrito): Observable<SuccessRequest>{
    const urlPeticion = `${this.servidorUrl}/new/carrito`;
    return this.http.post<SuccessRequest>(urlPeticion, data);
  }

  public solicitaAriculosCarrito(numPage: number): Observable<dataArticulesCarritoRegistered>{
    return this.buscaArticulosCarrito(numPage);
  }

  private buscaArticulosCarrito(numPage: number): Observable<dataArticulesCarritoRegistered> {
    const urlPeticion = `${this.servidorUrl}/carrito/page/${numPage}`;
    return this.http.get<DataJSONShowCarrito>(urlPeticion).pipe(
      map((data: DataJSONShowCarrito) => {
        const dataResponse: dataArticulesCarritoRegistered = {
          content: data.articulos.content,
          pageNumber: data.articulos.pageable.pageNumber,
          pageSize: data.articulos.pageable.pageSize,
          totalElements: data.articulos.totalElements,
          totalPages: data.articulos.totalPages,
          costoTotal: data.costoTotal
        }
        return dataResponse;
      })
    );
  }

  public solicitaEliminarCarrito(): Observable<SuccessRequest>{
    return this.eliminaCarrito();
  }

  private eliminaCarrito(): Observable<SuccessRequest> {
    const urlPeticion = `${this.servidorUrl}/limpia/carrito`;
    return this.http.delete<SuccessRequest>(urlPeticion);
  }

  public solicitaEliminaArticuloCarrito(id: number): Observable<SuccessRequest>{
    return this.eliminaArticuloCarrito(id);
  }

  private eliminaArticuloCarrito(id: number): Observable<SuccessRequest> {
    const urlPeticion = `${this.servidorUrl}/limpia/carrito/articulo/${id}`;
    return this.http.delete<SuccessRequest>(urlPeticion);
  }

  public solicitaActualizarArticuloCarrito(data: updateArticuloCarrito): Observable<SuccessRequest> {
    return this.actualizarArticuloCarrito(data);
  }

  private actualizarArticuloCarrito(data: updateArticuloCarrito): Observable<SuccessRequest> {
    const urlPeticion = `${this.servidorUrl}/actualiza/cantidad/carrito/articulo`;
    return this.http.put<SuccessRequest>(urlPeticion, data);
  }

}
