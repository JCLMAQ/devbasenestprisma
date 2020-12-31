import { createAction, props } from "@ngrx/store";
import { User } from "./user.model";

export const usersUpload = createAction(
  "[USERS LIST] Users Upload",
  props<{users: User[]}>()
)
