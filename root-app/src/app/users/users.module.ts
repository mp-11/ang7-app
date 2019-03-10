import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule }   from '@angular/forms';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users/users.component';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserListComponent } from './user-list/user-list.component';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { StoreModule } from '@ngrx/store';
import { reducers, effects } from '../store';
import { EffectsModule } from '@ngrx/effects';

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
    MatExpansionModule,
    MatProgressSpinnerModule,
    StoreModule.forFeature('people', reducers),
    EffectsModule.forFeature(effects)
  ]
})
export class UsersModule { }
