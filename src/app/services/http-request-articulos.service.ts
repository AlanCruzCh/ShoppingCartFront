import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, map } from 'rxjs';

import { environments } from 'src/environments/environments';

import { newArticule } from '../interfaces/formNewArticule.interfaces';
import { SuccessRequest } from '../interfaces/response-request.interfaces';
import { dataArticulesRegistered, dataJsonShowArticules } from '../interfaces/data-json.interfces';


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

}
