import { Injectable } from '@angular/core';
import { Effect, Actions, ofType} from '@ngrx/effects';
import { switchMap, map, catchError, tap } from 'rxjs/operators';

import { StarwarsService } from 'src/app/users/services/starwars.service';
import * as starWarsActions from '../actions/starwars.action';
import { of } from 'rxjs';


@Injectable()
export class StarWarsEffects {
    constructor(private actions$: Actions, private StarwarsService: StarwarsService) {}

    @Effect()
    loadPeople$ = this.actions$
        .pipe(
            ofType(starWarsActions.SEARCH_PEOPLE),
            switchMap((action: starWarsActions.SearchPeople) => {
                return this.StarwarsService.getPeople(action.payload.searchTerm).pipe(
                    map(({ results: people }) => new starWarsActions.SearchPeopleSuccess(people)),
                    catchError(error => of(new starWarsActions.SearchPeopleFail(error)))
                )
            })
        );

    @Effect()
    loadFilms$ = this.actions$
        .pipe(
            ofType(starWarsActions.LOAD_FILMS),
            switchMap((action: starWarsActions.SearchPeople) => {
                return this.StarwarsService.loadFilms().pipe(
                    map(({ results: films }) => new starWarsActions.LoadFilmsSuccess(films)),
                    catchError(error => of(new starWarsActions.LoadFilmsFail(error)))
                )
            })
        );
}