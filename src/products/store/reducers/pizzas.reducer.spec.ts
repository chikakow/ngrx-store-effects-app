import * as fromPizzas from './pizzas.reducer';
import * as fromActions from '../actions/pizzas.action';
import { Pizza } from '../../models/pizza.model';

describe('PizzaReducers', () => {
    describe('undefined action', () => {
        it('should return default state', () => {
            const { initialState } = fromPizzas;
            const action = {} as any;

            //state should not exists yet when app is bootstrapping.
            const state = fromPizzas.reducer(undefined, action);
            expect(state).toBe(initialState);
        });
    });

    describe('LOAD_PIZZAS action', () => {
        it('should set loading to be true', () => {
            const { initialState } = fromPizzas;
            const action = new fromActions.LoadPizzas();

            //state should not exists yet when app is bootstrapping.
            const state = fromPizzas.reducer(initialState, action);
            expect(state.entities).toEqual({});
            expect(state.loaded).toEqual(false);
            expect(state.loading).toEqual(true);
        });
    });

    describe('LOAD_PIZZAS_SUCCESS action', () => {

        let state: fromPizzas.PizzaState;
        let payload: Pizza[];

        beforeEach(() => {
            const { initialState } = fromPizzas;
            payload = [
                {
                    "name": "P1",
                    "toppings": [],
                    "id": 1
                },
                {
                    "name": "P2",
                    "toppings": [],
                    "id": 2
                },
            ];
            const action = new fromActions.LoadPizzasSuccess(payload);

            //state should not exists yet when app is bootstrapping.
            state = fromPizzas.reducer(initialState, action);
        });

        it('should map entities', () => {
            const entities = {
                1: payload[0],
                2: payload[1]
            }
            expect(state.entities).toEqual(entities);
        });

        it('should set loaded to be true', () => {
            expect(state.loading).toEqual(false);
            expect(state.loaded).toEqual(true);
        });
    });

    describe('LOAD_PIZZA_FAIL action', () => {
        it('should return initial state', () => {
            const { initialState } = fromPizzas;
            const action = new fromActions.LoadPizzasFail({});
            const state = fromPizzas.reducer(initialState, action);

            expect(state).toEqual(initialState);
        });

        it('should reset from previous state', () => {
            const { initialState } = fromPizzas;
            const previousState = { ...initialState, loading: true };
            const action = new fromActions.LoadPizzasFail({});
            const state = fromPizzas.reducer(previousState, action);

            expect(state.loading).toEqual(false);
        });
    });

    describe('CREATE_  UPDATE_ DELETE_ SUCCESS', () => {

        let previousState: fromPizzas.PizzaState;
        let previousEntitites: { [id: number]: Pizza };
        let pizzas: Pizza[];

        beforeEach(() => {
            const { initialState } = fromPizzas;
            pizzas = [
                { id: 1, name: 'P1', toppings: [] },
                { id: 2, name: 'P2', toppings: [] },
            ];

            previousEntitites = {
                [pizzas[0].id]: pizzas[0],
                [pizzas[1].id]: pizzas[1]
            }
            previousState = { ...initialState, entities: previousEntitites }
        });

        describe('CREATE_PIZZA_SUCCESS action', () => {
            it('should add the new pizza to the pizzas array', () => {

                const newPizza: Pizza =
                    { id: 3, name: 'PN', toppings: [] }
                const action = new fromActions.CreatePizzaSuccess(newPizza);
                const state = fromPizzas.reducer(previousState, action);

                expect(Object.keys(state.entities).length).toEqual(3);
                expect(state.entities).toEqual({ ...previousEntitites, 3: newPizza });
            });
        });

        describe('UPDATE_PIZZA_SUCCESS', () => {
            it('should update pizza', () => {
                const updatePizza: Pizza =
                    { id: 1, name: 'PU', toppings: [{ id: 1, name: 'T1' }] }
                const action = new fromActions.UpdatePizzaSuccess(updatePizza);
                const state = fromPizzas.reducer(previousState, action);

                expect(Object.keys(state.entities).length).toEqual(2);
                expect(state.entities[updatePizza.id]).toEqual(updatePizza);
            });
        });

        describe('REMOVE_PIZZA_SUCCESS', () => {
            it('should remove the pizza', () => {
                const removePizza: Pizza =
                    { id: 2, name: 'P2', toppings: [] };
                const action = new fromActions.DeletePizzaSuccess(removePizza);
                const state = fromPizzas.reducer(previousState, action);

                expect(Object.keys(state.entities).length).toEqual(1);
                expect(state.entities).toEqual({1: pizzas[0]});
            });
        });
    });

    describe('PizzaReducer Selectors', () => {
        describe('getPizzaEntities', () =>  {
            it('should return entities', () => {
                const entities: {[id: number]: Pizza} = {
                    1: { id: 1, name: 'P1', toppings: []},
                    2: { id: 2, name: 'P2', toppings: []}, 
                };

                const { initialState } = fromPizzas;
                const currentState = {...initialState, entities};
                const slice = fromPizzas.getPizzasEntities(currentState);

                expect(slice).toEqual(entities);
            });
        });

        describe('getPizzaLoading', () =>  {
            it('should return .loading', () => {
                const { initialState } = fromPizzas;
                const currentState = {...initialState, loading: true};
                const slice = fromPizzas.getPizzasLoading(currentState);

                expect(slice).toEqual(true);
            });
        });

        describe('getPizzaLoaded', () =>  {
            it('should return .loading', () => {
                const { initialState } = fromPizzas;
                const currentState = {...initialState, loaded: true};
                const slice = fromPizzas.getPizzasLoaded(currentState);

                expect(slice).toEqual(true);
            });
        });
    });
});