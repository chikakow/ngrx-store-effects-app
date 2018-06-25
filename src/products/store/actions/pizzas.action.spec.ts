import * as fromPizzas from './pizzas.action';
import { Pizza } from '../../models/pizza.model';

describe('Pizzas Actions', () => {

    describe('LoadPizzas Actions', () => {
        describe('LoadPizzas', () => {
            it('should create an action', () => {
                const action = new fromPizzas.LoadPizzas();

                // we are speading action to be a new object so it won't be an object of LoadPizzas object.
                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS
                });
            });
        });
        describe('LoadPizzasSuccess', () => {
            it('should create an action', () => {
                const payload: Pizza[] = [
                    {
                        "name": "Blazin' Inferno",
                        "toppings": [
                            {
                                "id": 10,
                                "name": "pepperoni"
                            },
                            {
                                "id": 9,
                                "name": "pepper"
                            },
                            {
                                "id": 3,
                                "name": "basil"
                            },
                            {
                                "id": 4,
                                "name": "chili"
                            },
                            {
                                "id": 7,
                                "name": "olive"
                            },
                            {
                                "id": 2,
                                "name": "bacon"
                            }
                        ],
                        "id": 1
                    },
                    {
                        "name": "Seaside Surfin'",
                        "toppings": [
                            {
                                "id": 6,
                                "name": "mushroom"
                            },
                            {
                                "id": 7,
                                "name": "olive"
                            },
                            {
                                "id": 2,
                                "name": "bacon"
                            },
                            {
                                "id": 3,
                                "name": "basil"
                            },
                            {
                                "id": 1,
                                "name": "anchovy"
                            },
                            {
                                "id": 8,
                                "name": "onion"
                            },
                            {
                                "id": 11,
                                "name": "sweetcorn"
                            },
                            {
                                "id": 9,
                                "name": "pepper"
                            },
                            {
                                "id": 5,
                                "name": "mozzarella"
                            }
                        ],
                        "id": 2
                    },
                ]
                const action = new fromPizzas.LoadPizzasSuccess(payload);

                // we are speading action to be a new object so it won't be an object of LoadPizzas object.
                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_SUCCESS,
                    payload
                });
            });
        });
        describe('LoadPizzasFail', () => {
            it('should create an action', () => {
                const payload = { errorMsg: 'error msg' };
                const action = new fromPizzas.LoadPizzasFail(payload);

                // we are speading action to be a new object so it won't be an object of LoadPizzas object.
                expect({ ...action }).toEqual({
                    type: fromPizzas.LOAD_PIZZAS_FAIL,
                    payload
                });
            });
        });
    });

});