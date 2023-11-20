import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LayoutCompraArticulosPageComponent } from './pages/layout-compra-articulos-page/layout-compra-articulos-page.component';
import { ArticulosDisponiblesPageComponent } from './pages/articulos-disponibles-page/articulos-disponibles-page.component';
import { CarritoPageComponent } from './pages/carrito-page/carrito-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutCompraArticulosPageComponent,
    children: [
      { path: 'productos-disponibles', component: ArticulosDisponiblesPageComponent },
      { path: 'productos-carrito', component: CarritoPageComponent },
      { path: '**', redirectTo: 'productos-disponibles' }
    ]
  }
];


@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ],
})
export class CompraArticulosRoautingModule {}
