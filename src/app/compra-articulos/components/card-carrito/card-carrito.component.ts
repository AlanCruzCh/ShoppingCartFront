import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ArticulosCarrito } from 'src/app/interfaces/data-json.interfces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { CompraArticulosService } from '../../services/compra-articulos.service';

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

  ngOnChanges(changes: SimpleChanges): void {
    this.dataCard = [...this.data!];
  }

  constructor(
    private alertService: AlertService,
    private compraArticuloService: CompraArticulosService
  ) { }

}
