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
import { UserActions } from '../user.actions-types';
import { User } from '../user.model';


export const userFeatureKey = 'user';

export interface UserState {
  users: User[]
}

export const initialUserState: UserState = {
   users:  []
}

// export const reducers: ActionReducerMap<UserState> = {

// };

export const userReducer = createReducer(
  initialUserState,
  on(UserActions.usersUpload, (state, action ) => {
    return {
      users: action.users
    }
  } )
)


export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];
