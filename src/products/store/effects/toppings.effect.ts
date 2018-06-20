import { Injectable } from "@angular/core";

import { Effect, Actions } from "@ngrx/effects";
import { of } from "rxjs/observable/of";
import { map, catchError, switchMap } from "rxjs/operators";

import * as toppingActions from "../actions/toppings.action";
import * as fromServices from "../../services/toppings.service";

@Injectable()
export class ToppingsEffects {
    constructor(
        private action$: Actions, 
        private toppingService: fromServices.ToppingsService) {
    }

    // you can call anything you like doesn't need to be loadToppings$
    @Effect()
    loadToppings$ = this.action$.ofType(toppingActions.LOAD_TOPPINGS).pipe(
        switchMap(() => {
            return this.toppingService.getToppings().pipe(
                map(toppings => new toppingActions.LoadToppingsSuccess(toppings)),
                catchError(err => of(new toppingActions.LoadToppingsFail(err)))
            )
        })
    )
}
