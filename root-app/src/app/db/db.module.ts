import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DbViewComponent } from './db-view/db-view.component';
import { DbRoutingModule } from './db-routing.module';

@NgModule({
  declarations: [
    DbViewComponent
  ],
  imports: [
    CommonModule,
    DbRoutingModule
  ]
})
export class DbModule { }
