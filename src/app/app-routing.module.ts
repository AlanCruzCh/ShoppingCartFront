import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WelcomePageComponent } from './welcome-page/welcome-page.component';

const routes: Routes = [
  {
    path: 'registra-articulos',
    loadChildren: () => import('./captura-articulos/captura-articulos.module').then(m => m.CapturaArticulosModule),
  },
  {
    path: 'compra-articulos',
    loadChildren: () => import('./compra-articulos/compra-articulos.module').then(m => m.CompraArticulosModule),
  },
  {
    path: 'inicio',
    component: WelcomePageComponent
  },
  {
    path: '',
    redirectTo: 'inicio',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
