import { Component, OnInit } from '@angular/core';
import { Subject, Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromStore from './../../store';
import { Person } from './../../models/person';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { Film } from 'src/app/models/film';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.less']
})
export class UserListComponent implements OnInit {
  filterForm: FormGroup;
  searching$: Subject<any> = new Subject();
  searchingSubsriber$: any;
  
  searchTerm: string = '';
  filterType: string = 'people';
  loading$: Observable<boolean>;
  isLoaded$: Observable<boolean>;
  films$: Observable<Film[]>;
  results$: Observable<Person[]>;
  
  constructor(private store: Store<fromStore.State>, private fb: FormBuilder) { }
  
  ngOnInit() {
    this.loading$ = this.store.select(fromStore.getPeopleLoading);
    this.isLoaded$ = this.store.select(fromStore.getPeopleLoaded);
    this.films$ = this.store.select(fromStore.getFilms);
    this.buildFilterForm();

    this.filterSubscribtion();
    this.store.dispatch(new fromStore.LoadFilms())
    
    this.results$ = this.store.select(fromStore.getFilteredPeople);
  }

  buildFilterForm() {
    this.filterForm = this.fb.group({
      'film': ''
    });

    this.filterForm.controls['film'].valueChanges.subscribe(value => {
      let filmFilter = value === '' ? value : value.url;
      this.store.dispatch(new fromStore.UpdateFilters({ film: filmFilter }));
    });
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
