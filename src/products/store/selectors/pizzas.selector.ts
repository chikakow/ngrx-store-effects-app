import { createSelector } from "@ngrx/store";

import * as fromRoot from '../../../app/store';
import * as fromFeature from "../reducers";
import * as fromPizzas from "../reducers/pizzas.reducer";
import * as fromToppings from "./toppings.selector";

import { Pizza } from '../../models/pizza.model';
import { Topping } from '../../models/topping.model';

// pizzas state
export const getPizzaState = createSelector(
  fromFeature.getProductsState,
  (state: fromFeature.ProductsState) => state.pizzas
);

export const getPizzasEntities = createSelector(
  getPizzaState,
  fromPizzas.getPizzasEntities
);

export const getSelectedPizza = createSelector(
    getPizzasEntities, 
    fromRoot.getRouterState,
    (entities, router): Pizza => {
        return router.state && entities[router.state.params.pizzaId];
    }
)

export const getPizzaVisualized = createSelector(
  getSelectedPizza,
  fromToppings.getToppingsEntities,
  fromToppings.getSelectedToppings,
  (pizza: Pizza, toppingsEntities: {[id: number]: Topping}, selectedToppings: number[]) => {
    const toppings = selectedToppings.map(id => toppingsEntities[id]);
    return {
      ...pizza,
      toppings
    }
  }
)

// converting back to array from entity model in selector.
export const getAllPizzas = createSelector(getPizzasEntities, entities => {
  return Object.keys(entities).map(id => entities[parseInt(id, 10)]);
});

export const getPizzasLoaded = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoaded
);

export const getPizzasLoading = createSelector(
  getPizzaState,
  fromPizzas.getPizzasLoading
);
