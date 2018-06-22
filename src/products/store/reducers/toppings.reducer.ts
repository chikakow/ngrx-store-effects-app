import * as fromToppings from '../actions/toppings.action';
import { Topping } from '../../models/topping.model';

export interface ToppingsState {
    entities: {[id: number]: Topping},
    selectedToppings: number[],
    loaded: boolean;
    loading: boolean;
}

export const initialState: ToppingsState = {
    entities: {},
    selectedToppings: [],
    loaded: false,
    loading: false
}

export function reducer(
    state = initialState,
    action: fromToppings.ToppingAction
): ToppingsState {

    switch(action.type) {
        case fromToppings.VISUALISE_TOPPINGS: {
            const selectedToppings = action.payload
            return {
                ...state,
                selectedToppings
            }
        }
        case fromToppings.LOAD_TOPPINGS: {
            return {
                ...state,
                loading: true,
                loaded: false
            }
        }
        case fromToppings.LOAD_TOPPINGS_SUCCESS: {
            const toppings = action.payload;

            const entities = toppings.reduce(
                (entities: { [id: number]: Topping }, topping: Topping) => {
                    return {
                        ...entities,
                        [topping.id]: topping
                    }
                },
                {
                  ...state.entities
                }
              );

            return {
                ...state,
                loaded: true,
                loading: false,
                entities
            }
        }
        case fromToppings.LOAD_TOPPINGS_FAIL: {
            return {
                ...state,
                loaded: false,
                loading: false
            }
        }
    }
    return state;
}


export const getToppingsEntities = (state: ToppingsState) => state.entities;
export const getToppingsLoaded = (state: ToppingsState) => state.loaded;
export const getToppingsLoading = (state: ToppingsState) => state.loading;
export const getSelectedToppings = (state: ToppingsState) => state.selectedToppings;
