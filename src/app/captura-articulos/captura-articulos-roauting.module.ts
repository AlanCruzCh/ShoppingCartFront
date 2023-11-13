import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { CapturaArticulosPageComponent } from './pages/captura-articulos-page/captura-articulos-page.component';
import { LayoutCapturaArticulosPageComponent } from './pages/layout-captura-articulos-page/layout-captura-articulos-page.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutCapturaArticulosPageComponent,
    children: [
      { path: 'inicio', component: CapturaArticulosPageComponent },
      { path: '**', redirectTo: 'inicio' }
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
export class CapturaArticulosRoautingModule {}
