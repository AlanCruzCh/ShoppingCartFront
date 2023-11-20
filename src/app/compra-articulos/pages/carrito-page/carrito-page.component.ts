import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompraArticulosService } from '../../services/compra-articulos.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ArticulosCarrito, dataArticulesCarritoRegistered } from 'src/app/interfaces/data-json.interfces';
import { ErrorRequest } from 'src/app/interfaces/response-request.interfaces';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.css']
})
export class CarritoPageComponent implements OnInit, OnDestroy{

  private subscriptionArticulosCarrito?: Subscription;
  public dataCardsCarrito: ArticulosCarrito[] = [];
  public totalItems: number = 0;
  public isLoading: boolean = false;
  public costoTotal: number = 0;

  constructor(
    private compraArticuloService: CompraArticulosService,
    private alertService: AlertService,
  ) { }

  ngOnInit(): void {
    this.buscaArticulosCarrito(0);
  }
  ngOnDestroy(): void {
    this.subscriptionArticulosCarrito?.unsubscribe();
  }



  public eliminarCarritoCompra(){

  }

  private buscaArticulosCarrito(numPage: number) {
    this.isLoading = true;
    this.subscriptionArticulosCarrito = this.compraArticuloService.solicitaArticulosCarrito(numPage).subscribe({
      next: (data: dataArticulesCarritoRegistered) => {
        console.log(data);
        this.isLoading = false;
        this.dataCardsCarrito = [...data.content];
        this.totalItems = data.totalElements;
        this.costoTotal = data.costoTotal
      },
      error: (error: ErrorRequest) => {
        this.isLoading = false;
        if (error.codigoError >= 400 && error.codigoError > 500) {
          this.alertService.alertResponseRequest('Error ' + error.codigoError, error.respuesta, 'error');
        } else {
          this.alertService.alertResponseRequest('Error ' + error.codigoError, error.respuesta, 'warning');
        }
      }
    })
  }

}
