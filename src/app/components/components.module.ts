import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PatrocinadoresComponent } from './patrocinadores/patrocinadores.component';

@NgModule({
  declarations: [PatrocinadoresComponent],
  exports: [
    PatrocinadoresComponent
  ],
  imports: [
    CommonModule
  ]
})
export class ComponentsModule { }
