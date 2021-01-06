import { createEntityAdapter, EntityState } from '@ngrx/entity';
import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createReducer,
  createSelector,
  MetaReducer,
  on
} from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { UserActions } from './user.actions-types';
import { User } from '../user.model';

// Reducer execute the action within the store: modifiy the store according to the actions.
export const userFeatureKey = 'users';

export interface UserState extends EntityState<User>{
  allCoursesLoaded: boolean
}

export const adapter = createEntityAdapter<User>();

export const initialUserState = adapter.getInitialState(
  {
    allUsersLoaded:false
  }
);

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.allUsersLoaded,
    (state, action) => adapter.setAll(action.users,
      {...state,
      allUsersLoaded: true
  }) )
)

export const { selectAll } = adapter.getSelectors();


export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];
