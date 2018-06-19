import { 
    ActivatedRouteSnapshot, 
    RouterStateSnapshot, 
    Params 
} from "@angular/router";
import * as fromRouter from "@ngrx/router-store";

import { ActionReducerMap, createFeatureSelector } from "@ngrx/store";

export interface RouterStateUrl {
  url: string;
  queryParams: Params;
  params: Params;
}

// ngrx-router project require you to have routerReduceder property in the root State
// fromRouter.RouterReducerState is from the package
export interface State {
  routerReducer: fromRouter.RouterReducerState<RouterStateUrl>;
}

// ActionReducerMap is used for type checking of interface 'State'
// fromRouter.routerReducer is from the @ngrx/router-store package also
export const reducers: ActionReducerMap<State> = {
  routerReducer: fromRouter.routerReducer,
};

export const getRouterState = createFeatureSelector<
fromRouter.RouterReducerState<RouterStateUrl>
>('routerReducer');

// this will listen to any router event in the program, anytime user navigate this returns the RouterStateUrl object.
export class CustomSerializer 
implements fromRouter.RouterStateSerializer<RouterStateUrl> {

    serialize(routerState: RouterStateSnapshot): RouterStateUrl {
        // below is equal to const url = routerState.url;
        // it's called destructuring.
        const { url } = routerState;
        const { queryParams } = routerState.root;
       
        let state: ActivatedRouteSnapshot = routerState.root;
        while (state.firstChild) {
            state = state.firstChild;
        }
        const { params } = state;

        return { url, queryParams, params };
    }
}
