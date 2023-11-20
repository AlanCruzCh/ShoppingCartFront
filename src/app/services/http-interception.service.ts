import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';

import { Observable, catchError, throwError } from 'rxjs';

import { ErrorRequest } from '../interfaces/response-request.interfaces';

@Injectable()
export class HttpInterceptionService implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        console.log(error);
        let errorMessage: string;
        if (error.error && error.error.message) {
          errorMessage = error.error.message;
        } else {
          errorMessage = error.error;
        }
        const errorResponse: ErrorRequest = {
          codigoError: error.status,
          respuesta: errorMessage
        };
        return throwError(() => errorResponse);
      })
    )
  }
}
