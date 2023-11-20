import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'compra-articulos-navegation-bar',
  templateUrl: './navegation-bar.component.html',
  styleUrls: ['./navegation-bar.component.css']
})
export class NavegationBarComponent implements OnInit, OnDestroy{

  public numArrticulos?: number;
  private intervalNumArticules: any;

  public ngOnInit(): void {
    this.intervalNumArticules = setInterval(() => {
      this.actualizaNumArticulos();
    }, 1000);
  }

  public ngOnDestroy(): void {
    if (this.intervalNumArticules) {
      clearInterval(this.intervalNumArticules);
    }
  }

  private actualizaNumArticulos(): void {
    this.numArrticulos = parseInt(JSON.parse(localStorage.getItem('nucArtCarrito')!));
  }

}
