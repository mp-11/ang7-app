import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatListModule } from '@angular/material/list';

@NgModule({
  declarations: [UsersComponent, UserInfoComponent, UserListComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    MatListModule
  ]
})
export class UsersModule { }
