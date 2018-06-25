import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { Routes, RouterModule } from "@angular/router";
import { ReactiveFormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";

//store
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";

//reducer
import { reducers, effects } from "./store";

// components
import * as fromComponents from "./components";

// containers
import * as fromContainers from "./containers";

//guards
import * as fromGaurds from './guards';

// services
import * as fromServices from "./services";

// routes
export const ROUTES: Routes = [
  {
    path: "",
    component: fromContainers.ProductsComponent,
    canActivate: [fromGaurds.PizzaGuard]
  },
  {
    path: "new",
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGaurds.PizzaGuard,  fromGaurds.ToppingsGuard]
  },
  {
    path: ":pizzaId",
    component: fromContainers.ProductItemComponent,
    canActivate: [fromGaurds.PizzaExistsGuards, fromGaurds.ToppingsGuard]
  }
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule.forChild(ROUTES),
    StoreModule.forFeature("products", reducers),
    EffectsModule.forFeature(effects)
  ],
  providers: [...fromServices.services, ...fromGaurds.guards],
  declarations: [...fromContainers.containers, ...fromComponents.components],
  exports: [...fromContainers.containers, ...fromComponents.components]
})
export class ProductsModule {}
