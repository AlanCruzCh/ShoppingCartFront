import { Component } from '@angular/core';
import { newArticule } from 'src/app/interfaces/formNewArticule.interfaces';
import { CapturaArticulosService } from '../../services/captura-articulos.service';
import { ErrorRequest, SuccessRequest } from 'src/app/interfaces/response-request.interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'app-captura-articulos-page',
  templateUrl: './captura-articulos-page.component.html',
  styleUrls: ['./captura-articulos-page.component.css']
})
export class CapturaArticulosPageComponent {

  constructor (
    private capturaArticuloService: CapturaArticulosService,
    private alertService: AlertService,
  ) { }

  public obtieneDatos(data: newArticule) {
    this.capturaArticuloService.registraNuevoArticulo(data)
    .subscribe({
      next: (data: SuccessRequest) => {
        this.alertService.alertResponseRequest('Exito', data.message, 'success');
      },
      error: (error: ErrorRequest) => {
        if (error.codigoError >= 400 && error.codigoError < 500) {
          this.alertService.alertResponseRequest('Error ' + error.codigoError, error.respuesta, 'warning');
        } else {
          this.alertService.alertResponseRequest('Error ' + error.codigoError, error.respuesta, 'error');
        }
      }
    });
  }

}
