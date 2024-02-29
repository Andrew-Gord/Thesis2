import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CreateclassesPage } from './createclasses.page';

const routes: Routes = [
  {
    path: '',
    component: CreateclassesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CreateclassesPageRoutingModule {}
