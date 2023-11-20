import { Component, OnDestroy, OnInit } from '@angular/core';
import { CompraArticulosService } from '../../services/compra-articulos.service';
import { Subscription } from 'rxjs';
import { articule, dataArticulesRegistered } from 'src/app/interfaces/data-json.interfces';
import { AlertService } from 'src/app/shared/services/alert.service';
import { ErrorRequest } from 'src/app/interfaces/response-request.interfaces';

@Component({
  selector: 'app-articulos-disponibles-page',
  templateUrl: './articulos-disponibles-page.component.html',
  styleUrls: ['./articulos-disponibles-page.component.css']
})
export class ArticulosDisponiblesPageComponent implements OnInit, OnDestroy{

  private subscriptionBuscaArticulos?: Subscription;
  public dataCards: articule[] =  [];
  public totalItems: number = 0;
  public isLoading: boolean = false;
  public filtroBusqueda: string = '';


  constructor (
    private compraArticulosService: CompraArticulosService,
    private alertService: AlertService
  ) { }

  ngOnInit(): void {
    this.buscaArtiulos('', 0);
  }

  ngOnDestroy(): void {
    this.subscriptionBuscaArticulos?.unsubscribe();
  }

  public onPageChanged(event: any) {
    this.buscaArtiulos('', event.pageIndex);
  }

  public solictaArticulos(): void{
    this.buscaArtiulos(this.filtroBusqueda, 0);
  }

  private buscaArtiulos(clave: string, page: number) {
    this.isLoading = true;
    this.compraArticulosService.buscaArticulosRegistrados(clave, page).subscribe({
      next: ( data: dataArticulesRegistered ) => {
        this.isLoading = false;
        this.dataCards = [...data.content];
        this.totalItems = data.totalElements;
      },
      error: ( error: ErrorRequest ) => {
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
