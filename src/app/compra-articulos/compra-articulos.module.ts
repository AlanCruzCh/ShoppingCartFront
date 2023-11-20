import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardArticuloComponent } from './components/card-articulo/card-articulo.component';
import { LayoutCompraArticulosPageComponent } from './pages/layout-compra-articulos-page/layout-compra-articulos-page.component';
import { ArticulosDisponiblesPageComponent } from './pages/articulos-disponibles-page/articulos-disponibles-page.component';
import { NavegationBarComponent } from './components/navegation-bar/navegation-bar.component';
import { CompraArticulosRoautingModule } from './compra-articulos-roauting.module';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { SharedModule } from '../shared/shared.module';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';
import { CardCarritoComponent } from './components/card-carrito/card-carrito.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CardArticuloComponent,
    LayoutCompraArticulosPageComponent,
    ArticulosDisponiblesPageComponent,
    NavegationBarComponent,
    CarritoPageComponent,
    CardCarritoComponent,
  ],
  imports: [
    CommonModule,
    CompraArticulosRoautingModule,
    MaterialAngularModule,
    SharedModule,
    FormsModule
  ]
})
export class CompraArticulosModule { }
