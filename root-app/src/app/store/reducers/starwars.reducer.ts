import { Action } from '@ngrx/store';
import * as fromStarWars from './../actions/starwars.action'
import { Person } from './../../models/person';
import { Film } from 'src/app/models/film';
import { Filters } from 'src/app/models/filter';
 
export interface State {
    data: Person[],
    films: Film[],
    filters: Filters,
    loaded: boolean,
    loading: boolean
}
 
export const initialState: State = {
    data: [],
    films: [],
    filters: { film: ''},
    loaded: false,
    loading: false
};
 
export function reducer(state = initialState, action: fromStarWars.StarWarsAction): State {
  switch (action.type) {
    case fromStarWars.SEARCH_PEOPLE: {
        return {
            ...state,
            loading: true
        };
    }

    case fromStarWars.SEARCH_PEOPLE_SUCCESS: {
        return {
            ...state,
            loading: false,
            loaded: true,
            data: action.payload
        };
    }

    case fromStarWars.SEARCH_PEOPLE_FAIL: {
        return {
            ...state,
            data: [],   
            loading: false,
            loaded: false
        };
    }

    case fromStarWars.LOAD_FILMS: {
        return {
            ...state,
            loading: true
        };
    }

    case fromStarWars.UPDATE_FILTERS: {
        return {
            ...state,
            filters: action.payload
        };
    }

    case fromStarWars.LOAD_FILMS_SUCCESS: {
        return {
            ...state,
            loading: false,
            films: action.payload
        };
    }
  }

  return state;
}

export const getPersonLoading = (state: State) => state.loading;
export const getPersonLoaded = (state: State) => state.loaded;
export const getPerson = (state: State) => state.data;
export const getFilms = (state: State) => state.films;
export const getFilters = (state: State) => state.filters;