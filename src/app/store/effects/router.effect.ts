import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { Effect, Actions } from '@ngrx/effects';
import * as RouterActions from '../actions/router.action';

import { tap, map } from 'rxjs/operators';

@Injectable()
export class RouterEffects {
    constructor(
        private actions$: Actions,
        private router: Router,
        private location: Location
    ){}

    @Effect({ dispatch: false })
    navigate$ = this.actions$.ofType(RouterActions.GO)
    .pipe(
        map((action: RouterActions.Go) => action.payload),
        tap(({ path, query: queryParams, extras}) => {
            // This is considered to be the best practices, 
            // since this way, we don't need to inject router everywhere in the component.
            // It's only handled here
            this.router.navigate(path, {queryParams, ...extras});
        })
    );

    @Effect({dispatch: false})
    back$ = this.actions$.ofType(RouterActions.BACK)
    .pipe(tap(() => this.location.back()));

    @Effect({dispatch: false})
    forward$ = this.actions$.ofType(RouterActions.FORWARD)
    .pipe(tap(() => this.location.forward()));
}
