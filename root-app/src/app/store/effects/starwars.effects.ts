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
                const type = action.payload.type;
                const searcTerm = action.payload.searchTerm;

                return this.StarwarsService.getData(type, searcTerm).pipe(
                    map(res => new starWarsActions.SearchPeopleSuccess(res.results)),
                    catchError(error => of(new starWarsActions.SearchPeopleFail(error)))
                )
            })
        )
}