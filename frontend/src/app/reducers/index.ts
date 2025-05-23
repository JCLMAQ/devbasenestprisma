
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';
import { routerReducer } from '@ngrx/router-store';

// export const authFeatureKey = 'auth';

export interface AppState {

};

export const reducers: ActionReducerMap<AppState> = {
  router: routerReducer
};

export function actionsStatesLogger(reducer:ActionReducer<any>)
    : ActionReducer<any> {
    return (state, action) => {
        // console.log("state before: ", state);
        // console.log("action", action);

        return reducer(state, action);
    }

}

export const metaReducers: MetaReducer<AppState>[] = !environment.production ? [actionsStatesLogger] : [];
