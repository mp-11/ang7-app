import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Person } from './../../models/person';
import { StarwarsService } from '../services/starwars.service';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  searching$: Subject<any>;
  searchingSubsriber$: any;
  
  searchTerm: string = '';
  filterType: string = 'people';
  loading$: any;
  isLoaded$: any;
  results$: Observable<Person[]>;
  
  constructor(private store: Store<fromStore.State>, private StarwarsService: StarwarsService) {
    this.searching$ = new Subject();
  }
  
  ngOnInit() {
    this.filterSubscribtion();

    this.loading$ = this.store.select<any>(fromStore.getPeopleLoading);
    this.isLoaded$ = this.store.select<any>(fromStore.getPeopleLoaded);
    this.results$ = this.store.select<any>(fromStore.getAllPeople);

    this.StarwarsService.init();
  }

  searchValueChanged(searchTerm) {
    this.doSearch(searchTerm);
  }

  onChangeFilter(filter){ 
    this.filterType = filter.value;
    this.doSearch();
  }

  doSearch(searchTerm = this.searchTerm, type = this.filterType) {
    if(!searchTerm) return;
    this.searching$.next({ searchTerm, type });
  }

  filterSubscribtion() {
    this.searchingSubsriber$ = this.searching$
      .pipe(
        debounceTime(300),
        distinctUntilChanged()
      )
      .subscribe(searchTerm => this.store.dispatch(new fromStore.SearchPeople(searchTerm)));
  }

  ngOnDestroy(): void {
    this.searchingSubsriber$.unsubscribe();    
  }
}
