// below is mostly for type checking
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';
import * as fromPizzas from './pizzas.reducers';

export interface ProductsState {
    pizzas: fromPizzas.PizzaState
}

export const reducers: ActionReducerMap<ProductsState> = {
    pizzas: fromPizzas.reducer
};


//*** selectors */

// the string value 'products' comes from products.module.ts StoreModule.forFeature('products'..)
// whatever we name in the forFeature, we need to use it here.
export const getProductsState = createFeatureSelector<ProductsState>('products');

// explanation of selectors
// const state = {
//     products: {
//         pizzas: {
//             data: [],
//             loaded: false,
//             loading: false
//         }
//     }
// }

