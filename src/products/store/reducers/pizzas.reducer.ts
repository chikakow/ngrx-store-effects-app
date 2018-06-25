import { Pizza } from "../../models/pizza.model";
import * as fromPizzas from "../actions/pizzas.action";

export interface PizzaState {
  entities: { [id: number]: Pizza };
  loaded: boolean;
  loading: boolean;
}

export const initialState: PizzaState = {
  entities: {},
  loaded: false,
  loading: false
};

export function reducer(
  state = initialState,
  action: fromPizzas.PizzasAction
): PizzaState {
  switch (action.type) {
    case fromPizzas.LOAD_PIZZAS: {
      return {
        ...state,
        loading: true
      };
    }
    case fromPizzas.LOAD_PIZZAS_SUCCESS: {
      const pizzas = action.payload;
      // we want to convert from this below array model to
      // [{id: 1, name: 'Peperoni Pizza', toppings: []}, {id: 2, name: 'Veggie Pizza', toppings: []}]

      // this 'entity' model
      // const pizza: any = {
      //     1: {
      //         id: 1,
      //         name: 'Peperoni Pizza',
      //         toppings: []
      //     },
      //     2: {
      //         id: 2,
      //         name: 'Veggie Pizza',
      //         toppings: []
      //     }
      // }

      // const id = 1
      // pizza[id]

      const entities = pizzas.reduce(
        (entities: { [id: number]: Pizza }, pizza: Pizza) => {
            return {
                ...entities,
                [pizza.id]: pizza
            }
        },
        {
          ...state.entities
        }
      );

    //   console.log('entity is', entities);

      return {
        ...state,
        loading: false,
        loaded: true,
        entities
      };
    }
    case fromPizzas.LOAD_PIZZAS_FAIL: {
      return {
        ...state,
        loading: false,
        loaded: false
      };
    }

    case fromPizzas.UPDATE_PIZZA_SUCCESS:
    case fromPizzas.CREATE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      const entities = {
        ...state.entities,
        [pizza.id]: pizza    
      };
      return {
        ...state,
        entities
      }
    }

    case fromPizzas.DELETE_PIZZA_SUCCESS: {
      const pizza = action.payload;
      // below syntax is es6 destructuring on steroid. 
      // [pizza.id]: removed - extract removed pizza.
      // ...entities - will spead the rest of the entities minus what's extracted.
      const { [pizza.id]: removed, ...entities } = state.entities;
      // below will just logout one removed pizza object 
      // console.log(removed)
      return {
        ...state,
        entities
      }
    }
  }
  return state;
}

export const getPizzasEntities = (state: PizzaState) => state.entities;
export const getPizzasLoading = (state: PizzaState) => state.loading;
export const getPizzasLoaded = (state: PizzaState) => state.loaded;
