import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardArticuloComponent } from './components/card-articulo/card-articulo.component';
import { LayoutCompraArticulosPageComponent } from './pages/layout-compra-articulos-page/layout-compra-articulos-page.component';
import { ArticulosDisponiblesPageComponent } from './pages/articulos-disponibles-page/articulos-disponibles-page.component';
import { NavegationBarComponent } from './components/navegation-bar/navegation-bar.component';
import { CompraArticulosRoautingModule } from './compra-articulos-roauting.module';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    CardArticuloComponent,
    LayoutCompraArticulosPageComponent,
    ArticulosDisponiblesPageComponent,
    NavegationBarComponent
  ],
  imports: [
    CommonModule,
    CompraArticulosRoautingModule,
    MaterialAngularModule,
    SharedModule
  ]
})
export class CompraArticulosModule { }
