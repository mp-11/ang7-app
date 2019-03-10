import * as fromStarWars from './starwars.reducer';
import { ActionReducerMap, createSelector, createFeatureSelector } from '@ngrx/store';
 
export interface State {
    people: fromStarWars.State;
}
 
export const reducers: ActionReducerMap<State> = {
    people: fromStarWars.reducer
};

export const getState = createFeatureSelector<State>(
    'people'
);

export const getPeopleState = createSelector(
    getState,
    (state: State) => state.people
 );

 export const getAllPeople = createSelector(
    getPeopleState,
    fromStarWars.getPerson
 )

 export const getPeopleLoaded = createSelector(
    getPeopleState,
    fromStarWars.getPersonLoaded
 )

 export const getPeopleLoading = createSelector(
    getPeopleState,
    fromStarWars.getPersonLoading
 )