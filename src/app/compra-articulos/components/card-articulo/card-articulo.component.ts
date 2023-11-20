import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { articule } from 'src/app/interfaces/data-json.interfces';
import { AlertService } from 'src/app/shared/services/alert.service';

@Component({
  selector: 'compra-articulos-card-articulo',
  templateUrl: './card-articulo.component.html',
  styleUrls: ['./card-articulo.component.css']
})
export class CardArticuloComponent implements OnChanges {

  @Input()
  public data?: articule[] = []
  public dataCard: articule[] = [];

  ngOnChanges(changes: SimpleChanges): void {
    this.dataCard = [...this.data!];
  }

  constructor (
    private alertService: AlertService
  ) { }

  public solicitarNumProductos(idArticulo: number){
    this.alertService.agregaProductos().then(
      (numProductos: string) => {
        if ( numProductos != undefined || numProductos != '') {

        }
      }
    );
  }

}
