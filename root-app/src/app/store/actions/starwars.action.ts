import { Action } from '@ngrx/store';
import { Person } from './../../models/person';

// search Person

export const SEARCH_PEOPLE = "[People] Search People";
export const SEARCH_PEOPLE_FAIL = "[People] Search People Fail";
export const SEARCH_PEOPLE_SUCCESS = "[People] Search People Success";

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

export type StarWarsAction = SearchPeople | SearchPeopleFail | SearchPeopleSuccess;