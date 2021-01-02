// import { createEntityAdapter, EntityState } from '@ngrx/entity';
// import {
//   ActionReducer,
//   ActionReducerMap,
//   createFeatureSelector,
//   createReducer,
//   createSelector,
//   MetaReducer,
//   on
// } from '@ngrx/store';
// import { environment } from 'src/environments/environment';
// import { UserActions } from '../user.actions-types';
// import { User } from '../user.model';


// export const userFeatureKey = 'users';

// export interface UserState extends EntityState<User>{
// }

// export const adapter = createEntityAdapter<User>();

// export const initialUserState = adapter.getInitialState();

// export const userReducer = createReducer(
//   initialUserState,
//   on(UserActions.allUsersLoaded,
//     (state, action) => adapter.setAll(action.users, state) )
// )


// export const metaReducers: MetaReducer<UserState>[] = !environment.production ? [] : [];
