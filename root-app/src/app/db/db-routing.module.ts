import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DbViewComponent } from './db-view/db-view.component';

const routes: Routes = [
    { path: 'firebase', component: DbViewComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DbRoutingModule { }
