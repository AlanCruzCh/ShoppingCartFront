import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutCapturaArticulosPageComponent } from './pages/layout-captura-articulos-page/layout-captura-articulos-page.component';
import { CapturaArticulosPageComponent } from './pages/captura-articulos-page/captura-articulos-page.component';
import { CapturaArticulosRoautingModule } from './captura-articulos-roauting.module';
import { FormRegistraArticulosComponent } from './components/form-registra-articulos/form-registra-articulos.component';

@NgModule({
  declarations: [
    LayoutCapturaArticulosPageComponent,
    CapturaArticulosPageComponent,
    FormRegistraArticulosComponent
  ],
  imports: [
    CommonModule,
    CapturaArticulosRoautingModule
  ]
})
export class CapturaArticulosModule { }
