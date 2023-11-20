import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImgComponent } from './components/lazy-img/lazy-img.component';
import { MaterialAngularModule } from '../material-angular/material-angular.module';


@NgModule({
  declarations: [

    LazyImgComponent
  ],
  imports: [
    CommonModule,
    MaterialAngularModule
  ],
  exports: [
    LazyImgComponent
  ]
})
export class SharedModule { }
