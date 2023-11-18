import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { environments } from 'src/environments/environments';

import { newArticule } from '../interfaces/formNewArticule.interfaces';
import { SuccessRequest } from '../interfaces/response-request.interfaces';


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

}
