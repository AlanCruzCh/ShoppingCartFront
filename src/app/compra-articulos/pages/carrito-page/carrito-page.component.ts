import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompraArticulosService } from '../../services/compra-articulos.service';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ArticulosCarrito, dataArticulesCarritoRegistered } from 'src/app/interfaces/data-json.interfces';
import { ErrorRequest, SuccessRequest } from 'src/app/interfaces/response-request.interfaces';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { updateArticuloCarrito } from 'src/app/interfaces/formNewArticule.interfaces';

@Component({
  selector: 'app-carrito-page',
  templateUrl: './carrito-page.component.html',
  styleUrls: ['./carrito-page.component.css']
})
export class CarritoPageComponent implements OnInit, OnDestroy{

  private subscriptionArticulosCarrito?: Subscription;
  private subscriptionEliminaCarrito?: Subscription;
  public dataCardsCarrito: ArticulosCarrito[] = [];
  public totalItems: number = 0;
  public isLoading: boolean = false;
  public costoTotal: number = 0;

  constructor(
    private compraArticuloService: CompraArticulosService,
    private alertService: AlertService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.buscaArticulosCarrito(0);
  }
  ngOnDestroy(): void {
    this.subscriptionArticulosCarrito?.unsubscribe();
    this.subscriptionEliminaCarrito?.unsubscribe();
  }

  public confirmaEliminacion() {
    this.alertService.alertConfirmAction('Eliminando carrito', '¿Seguro que desea eliminar el carrito de compra?')
    .then((isConfirmed) => {
      if (isConfirmed) {
        this.eliminarCarritoCompra();
      }
    });
  }

  public eliminaArticuloCarrito(id:number): void {
    this.isLoading = true;
    this.compraArticuloService.eliminaArticuloCarrito(id).subscribe({
      next: (data: SuccessRequest) => {
        this.isLoading = false;
        this.alertService.alertResponseRequest('Exito', data.message, 'success');
        this.buscaArticulosCarrito(0);
        this.actualizaNumArticulosInCarrito();
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

  public actualizaCarritoArticulo(data: updateArticuloCarrito): void {
    this.isLoading = true;
    this.compraArticuloService.actualizaArticuloCarrito(data).subscribe({
      next: (data: SuccessRequest) => {
        this.isLoading = false;
        this.alertService.alertResponseRequest('Exito', data.message, 'success');
        this.buscaArticulosCarrito(0);
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

  public eliminarCarritoCompra(){
    this.isLoading = true;
    this.subscriptionEliminaCarrito = this.compraArticuloService.eliminaCarrito().subscribe({
      next: (data: SuccessRequest) => {
        this.isLoading = false;
        this.alertService.alertResponseRequest('Exito', data.message, 'success');
        this.router.navigateByUrl('/compra-articulos');
        localStorage.clear();
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

  public onPageChanged(event: any) {
    this.buscaArticulosCarrito(event.pageIndex);
  }

  private buscaArticulosCarrito(numPage: number) {
    this.isLoading = true;
    this.subscriptionArticulosCarrito = this.compraArticuloService.solicitaArticulosCarrito(numPage).subscribe({
      next: (data: dataArticulesCarritoRegistered) => {
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

  private actualizaNumArticulosInCarrito() {
    let numArticulos = parseInt(JSON.parse(localStorage.getItem('nucArtCarrito')!));
    numArticulos -= 1;
    if (numArticulos === 0) {
      localStorage.clear();
    } else {
      localStorage.setItem('nucArtCarrito', JSON.stringify(numArticulos));
    }
  }

}
