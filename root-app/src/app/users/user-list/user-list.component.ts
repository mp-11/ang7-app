import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Person } from './../../models/person';


@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  searchTerm: string = '';
  filterType: string = 'people';

  people: Person[];
  
  constructor(private store: Store<fromStore.State>) {}

  ngOnInit() {
    this.store.select<any>(fromStore.getState).subscribe(state => {
      console.log(state);
    })
  }

  searchValueChanged(search) {
    console.log(search, this.filterType);
  }

  onChangeFilter(filter){ 
    this.filterType = filter.value;
  }
}
