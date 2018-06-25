import { switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';
import { Injectable } from '@angular/core';

import { Effect, Actions } from '@ngrx/effects'; 

import * as fromRoot from '../../../app/store';
import * as pizzaActions from '../actions/pizzas.action';
import * as fromServices from '../../services';
import { Pizza } from '../../models/pizza.model';

@Injectable()
export class PizzasEffects {
    constructor(private actions$: Actions, private pizzaService: fromServices.PizzasService) {
    }

    // because of this decorator, the LoadPizzaSuccess will dispatch
    // if you do, @Effect({ dispatch: false}), then it won't dispatch
    @Effect()
    loadPizzas$ = this.actions$.ofType(pizzaActions.LOAD_PIZZAS)
    .pipe(
        switchMap(() => {
            return this.pizzaService.getPizzas().pipe(
                map((pizzas: Pizza[]) => new pizzaActions.LoadPizzasSuccess(pizzas)),
                catchError((error) => of(new pizzaActions.LoadPizzasFail(error)))
            )
        })
    )

    @Effect()
    createPizza$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA)
    .pipe(
        // when listening to action, whole action object gets returned but we are only interested in payload 
        // so 'map' is used here to only retunring the payload property 
        map((action: pizzaActions.CreatePizza) => action.payload),
        switchMap((pizza: Pizza) => {
            return this.pizzaService.createPizza(pizza)
            .pipe(
                map((pizza) => new pizzaActions.CreatePizzaSuccess(pizza)),
                catchError(error => of(new pizzaActions.CreatePizzaFail(error)))
            )
        })
    )

    // below is using fromRoot.Go action to navigate
    @Effect()
    createPizzaSuccess$ = this.actions$.ofType(pizzaActions.CREATE_PIZZA_SUCCESS)
    .pipe(
        map((action: pizzaActions.CreatePizzaSuccess) => action.payload),
        map((pizza: Pizza) => new fromRoot.Go({path: ['/products', pizza.id]}))
    )

    @Effect()
    updatePizza$ = this.actions$.ofType(pizzaActions.UPDATE_PIZZA)
    .pipe(
        map((action: pizzaActions.UpdatePizza) => action.payload),
        switchMap((pizza:Pizza) => {
            return this.pizzaService.updatePizza(pizza)
            .pipe(
                map((pizza:Pizza) => new pizzaActions.UpdatePizzaSuccess(pizza)),
                catchError(error => of(new pizzaActions.UpdatePizzaFail(error)))
            )
        })
    )


    @Effect()
    deletePizza$ = this.actions$.ofType(pizzaActions.DELETE_PIZZA)
    .pipe(
        map((action: pizzaActions.DeletePizza) => action.payload),
        switchMap((pizza: Pizza) => {
            return this.pizzaService.removePizza(pizza)
            .pipe(
                map(() => new pizzaActions.DeletePizzaSuccess(pizza)),
                catchError(error => of(new pizzaActions.DeletePizzaFail(error)))
            )
        })
    )

    //bellow is listening to multiple actions.  it gets fired on either actions.
    @Effect()
    deleteUpdatePizzaSuccess$ = this.actions$
    .ofType(
        pizzaActions.DELETE_PIZZA_SUCCESS,
        pizzaActions.UPDATE_PIZZA_SUCCESS
    )
    .pipe(
        map(() => new fromRoot.Go({
            path:['/products']
        }))
    )
}