import { PizzaGuard } from './pizzas.guard';
import { ToppingsGuard } from './toppings.guard';
import { PizzaExistsGuards } from './pizza-exists.guard';

export const guards:any[] = [PizzaGuard, PizzaExistsGuards, ToppingsGuard];

export * from './pizzas.guard';
export * from './pizza-exists.guard';
export * from './toppings.guard';