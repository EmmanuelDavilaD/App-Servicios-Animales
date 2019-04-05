import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { ListAllPage } from './list-all.page';
import { ListAllResolver } from './list-all.resolver';

const routes: Routes = [
  {
    path: '',
    component: ListAllPage,
    resolve: {
      data: ListAllResolver
    }
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ListAllPage],
  providers: [
    ListAllResolver
  ]
})
export class ListAllPageModule {}
