import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardArticuloComponent } from './components/card-articulo/card-articulo.component';
import { LayoutCompraArticulosPageComponent } from './pages/layout-compra-articulos-page/layout-compra-articulos-page.component';
import { ArticulosDisponiblesPageComponent } from './pages/articulos-disponibles-page/articulos-disponibles-page.component';
import { NavegationBarComponent } from './components/navegation-bar/navegation-bar.component';



@NgModule({
  declarations: [
    CardArticuloComponent,
    LayoutCompraArticulosPageComponent,
    ArticulosDisponiblesPageComponent,
    NavegationBarComponent
  ],
  imports: [
    CommonModule
  ]
})
export class CompraArticulosModule { }
