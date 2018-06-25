import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import * as fromStore from '../store';


@Injectable()
export class PizzaGuard implements CanActivate {

    constructor(private store: Store<fromStore.ProductsState>){}

    canActivate(): Observable<boolean> {
        return this.checkStore().pipe(

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