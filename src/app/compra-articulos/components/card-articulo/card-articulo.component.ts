import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { articule } from 'src/app/interfaces/data-json.interfces';
import { newCarrito } from 'src/app/interfaces/formNewArticule.interfaces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CompraArticulosService } from '../../services/compra-articulos.service';
import { ErrorRequest, SuccessRequest } from 'src/app/interfaces/response-request.interfaces';

@Component({
  selector: 'compra-articulos-card-articulo',
  templateUrl: './card-articulo.component.html',
  styleUrls: ['./card-articulo.component.css']
})
export class CardArticuloComponent implements OnChanges {

  @Input()
  public data?: articule[] = []
  public dataCard: articule[] = [];
  public isLoading: boolean = false;
  ngOnChanges(changes: SimpleChanges): void {
    this.dataCard = [...this.data!];
  }

  constructor (
    private alertService: AlertService,
    private compraArticuloService: CompraArticulosService
  ) { }

  public solicitarNumProductos(idArticulo: number){
    this.alertService.agregaProductos().then(
      (numProductos: number) => {
        if (numProductos != -1) {
          const data: newCarrito = { idArticulo, cantidad: numProductos };
          this.registraArticuloInCarrito(data);
        }
      }
    );
  }

  private registraArticuloInCarrito(data: newCarrito) {
    this.isLoading = true;
    this.compraArticuloService.solicitaRegistraArticulo(data).subscribe({
      next: (data: SuccessRequest) => {
        this.isLoading = false;
        this.alertService.alertResponseRequest('Exito', data.message, 'success');
        this.actualizaNumArticulosInCarrito();
      },
      error: (error: ErrorRequest) => {
        this.isLoading = false;
        if (error.codigoError >= 400 && error.codigoError < 500) {
          this.alertService.alertResponseRequest('Error ' + error.codigoError, error.respuesta, 'warning');
        } else {
          this.alertService.alertResponseRequest('Error ' + error.codigoError, error.respuesta, 'error');
        }
      }
    });
  }

  private actualizaNumArticulosInCarrito(){
    let numArticulos = 1;
    if (localStorage.getItem('nucArtCarrito') == null) {
      localStorage.setItem('nucArtCarrito', JSON.stringify( numArticulos ));
    }
    else{
      numArticulos = parseInt( JSON.parse( localStorage.getItem('nucArtCarrito')! ) );
      numArticulos += 1;
      localStorage.setItem('nucArtCarrito', JSON.stringify( numArticulos ));
    }
  }



}
