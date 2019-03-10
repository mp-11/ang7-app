import { Action } from '@ngrx/store';
import * as fromStarWars from './../actions/starwars.action'
import { Person } from './../../models/person';
 
export interface State {
    data: Person[],
    loaded: boolean,
    loading: boolean
}
 
export const initialState: State = {
    data: [],
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
  }

  return state;
}

export const getPersonLoading = (state: State) => state.loading;
export const getPersonLoaded = (state: State) => state.loaded;
export const getPerson = (state: State) => state.data;