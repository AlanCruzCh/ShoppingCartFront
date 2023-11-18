import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { newArticule } from 'src/app/interfaces/formNewArticule.interfaces';
import { SuccessRequest } from 'src/app/interfaces/response-request.interfaces';
import { HttpRequestArticulosService } from 'src/app/services/http-request-articulos.service';

@Injectable({
  providedIn: 'root'
})
export class CapturaArticulosService {

  constructor(
    private httpRequestArticulos: HttpRequestArticulosService
  ) { }

  public registraNuevoArticulo( data: newArticule ): Observable<SuccessRequest> {
    return this.httpRequestArticulos.solicitaRegistrorticulo( data );
  }
}
