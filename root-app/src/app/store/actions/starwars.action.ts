import { Action } from '@ngrx/store';
import { Person } from './../../models/person';
import { Film } from 'src/app/models/film';
import { Filters } from 'src/app/models/filter';

export const UPDATE_FILTERS = "[People] Update Filters";

export const SEARCH_PEOPLE = "[People] Search People";
export const SEARCH_PEOPLE_FAIL = "[People] Search People Fail";
export const SEARCH_PEOPLE_SUCCESS = "[People] Search People Success";

export const LOAD_FILMS = "[FILMS] Load films";
export const LOAD_FILMS_FAIL = "[FILMS] Load films Fail";
export const LOAD_FILMS_SUCCESS = "[FILMS] load films Success";

export class SearchPeople implements Action {
    readonly type = SEARCH_PEOPLE;
    constructor(public payload?: any) {}
}

export class SearchPeopleFail implements Action {
    readonly type = SEARCH_PEOPLE_FAIL;
    constructor(public payload?: any) {}
}

export class SearchPeopleSuccess implements Action {
    readonly type = SEARCH_PEOPLE_SUCCESS;
    constructor(public payload: Person[]) {} 
}

export class UpdateFilters implements Action {
    readonly type = UPDATE_FILTERS;
    constructor(public payload: Filters) {} 
}

export class LoadFilms implements Action {
    readonly type = LOAD_FILMS;
    constructor(public payload?: any) {}
}

export class LoadFilmsFail implements Action {
    readonly type = LOAD_FILMS_FAIL;
    constructor(public payload?: any) {}
}

export class LoadFilmsSuccess implements Action {
    readonly type = LOAD_FILMS_SUCCESS;
    constructor(public payload: Film[]) {} 
}

export type StarWarsAction = SearchPeople 
    | SearchPeopleFail 
    | SearchPeopleSuccess 
    | LoadFilms
    | LoadFilmsFail
    | UpdateFilters
    | LoadFilmsSuccess;