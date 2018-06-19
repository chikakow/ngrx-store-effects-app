// below is mostly for type checking
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
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

// pizzas state
export const getPizzaState = createSelector(
    getProductsState, 
    (state: ProductsState) => state.pizzas
);

export const getAllPizzasEntities = createSelector(getPizzaState, fromPizzas.getPizzasEntities);

// converting back to array from entity model in selector.
export const getAllPizzas = createSelector(getAllPizzasEntities, (entities) => {
    return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(getPizzaState, fromPizzas.getPizzasLoaded);

export const getPizzasLoading = createSelector(getPizzaState, fromPizzas.getPizzasLoading);