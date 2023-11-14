import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutCapturaArticulosPageComponent } from './pages/layout-captura-articulos-page/layout-captura-articulos-page.component';
import { CapturaArticulosPageComponent } from './pages/captura-articulos-page/captura-articulos-page.component';
import { CapturaArticulosRoautingModule } from './captura-articulos-roauting.module';
import { FormRegistraArticulosComponent } from './components/form-registra-articulos/form-registra-articulos.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    LayoutCapturaArticulosPageComponent,
    CapturaArticulosPageComponent,
    FormRegistraArticulosComponent
  ],
  imports: [
    CommonModule,
    CapturaArticulosRoautingModule,
    MaterialAngularModule,
    ReactiveFormsModule,
  ]
})
export class CapturaArticulosModule { }
