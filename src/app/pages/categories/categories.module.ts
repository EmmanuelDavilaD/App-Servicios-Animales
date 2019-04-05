import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';

import { IonicModule } from '@ionic/angular';

import { CategoriesPage } from './categories.page';
import { CategoriesResolver } from './categories.resolver';

const routes: Routes = [
  {
    path: '',
    component: CategoriesPage,
    resolve: {
      data: CategoriesResolver
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
  declarations: [CategoriesPage],
  providers: [
    CategoriesResolver
  ]
})
export class CategoriesPageModule {}
