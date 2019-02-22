import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../store';

@NgModule({
  declarations: [UsersComponent, UserInfoComponent, UserListComponent],
  imports: [
    CommonModule,
    FormsModule,
    UsersRoutingModule,
    MatListModule,
    MatRadioModule,
    MatFormFieldModule,
    MatInputModule,
    StoreModule.forFeature('people', reducers)
  ]
})
export class UsersModule { }
