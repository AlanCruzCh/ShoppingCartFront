import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { ArticulosCarrito } from 'src/app/interfaces/data-json.interfces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CompraArticulosService } from '../../services/compra-articulos.service';
import { updateArticuloCarrito } from 'src/app/interfaces/formNewArticule.interfaces';

@Component({
  selector: 'compra-articulos-card-carrito',
  templateUrl: './card-carrito.component.html',
  styleUrls: ['./card-carrito.component.css']
})
export class CardCarritoComponent implements OnChanges{

  @Input()
  public data?: ArticulosCarrito[] = []
  public dataCard: ArticulosCarrito[] = [];
  public isLoading: boolean = false;
  @Output()
  public elimiarArticulo = new EventEmitter<number>();
  @Output()
  public actualizaCanbtidadArticulo = new EventEmitter<updateArticuloCarrito>();


  ngOnChanges(changes: SimpleChanges): void {
    this.dataCard = [...this.data!];
  }

  constructor(
    private alertService: AlertService,
  ) { }

  public confirmaEliminacion(id: number) {
    this.alertService.alertConfirmAction('Eliminando carrito', '¿Seguro que desea eliminar este articulo del carrito?')
    .then((isConfirmed) => {
      if (isConfirmed) {
        this.elimiarArticulo.emit(id);
      }
    });
  }

  public solicitarNumProductos(idArticulo: number, idCarrito: number, operacion: string) {
    this.alertService.agregaProductos().then(
      (numProductos: number) => {
        if (numProductos != -1) {
          const data: updateArticuloCarrito = {
            idArticulo,
            idCarrito,
            operacion,
            cantidad: numProductos
          };
          this.actualizaCanbtidadArticulo.emit(data);
        }
      }
    );
  }




}
