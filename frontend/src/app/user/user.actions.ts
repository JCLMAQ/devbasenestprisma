import { createAction, createReducer, props } from "@ngrx/store";
import { User } from "./user.model";

// export const usersUpload = createAction(
//   "[USERS LIST] Users Upload",
//   props<{users: User[]}>()
// )

export const loadAllUsers = createAction(
  "[Users Resolver] Load All Users"
);

export const allUsersLoaded = createAction(
  "[Load Users Effect] AllUsers Loaded",
  props<{users: User[]}>()
)
