import { createFeatureSelector, createSelector } from '@ngrx/store';
import { UserState } from './user.reducer';

import * as fromUsers from './user.reducer'

export const selectUsersState = createFeatureSelector<UserState>("users");



export const selectAllUsers = createSelector(
    selectUsersState,
    fromUsers.selectAll
);

export const areUsersLoaded = createSelector(
  selectUsersState,
  state => state.allUsersLoaded
);
