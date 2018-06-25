import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, catchError, map } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';

import { Pizza } from '../models/pizza.model';

@Injectable()
export class PizzaExistsGuards implements CanActivate {
    constructor(private store: Store<fromStore.ProductsState>) {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
        return this.checkStore().pipe(
            switchMap(() =>{
                const id = parseInt(route.params.pizzaId, 10);
                return this.hasPizza(id);
            })
        )
    }

    hasPizza(id: number): Observable<boolean> {
        return this.store
        .select(fromStore.getPizzasEntities).pipe(
            map((entities: { [key: number]: Pizza }) => !!entities[id]),
            take(1)
        )
    }

    checkStore(): Observable<boolean> {
        return this.store.select(fromStore.getPizzasLoaded)
        .pipe(
            tap(loaded => {
                if(!loaded){
                    this.store.dispatch(new fromStore.LoadPizzas())
                }
            }),
            // wait for loaded to become loaded = true
            filter(loaded => loaded),
            // then take 1 is like subscribe and after 1 is taken observable gets completed.
            take(1)
        );
    }
}