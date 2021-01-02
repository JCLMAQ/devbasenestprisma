import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { concatMap, map, tap } from "rxjs/operators";
import { allUsersLoaded } from "./user.actions";
import { UserActions } from "./user.actions-types";
import { UserService } from "./user.service";

@Injectable()
export class UsersEffects {

  constructor(
    private actions$: Actions,
    private userService: UserService) {
}

    loadUsers$ = createEffect(
        () => this.actions$
            .pipe(
                ofType(UserActions.loadAllUsers),
                concatMap(action =>
                    this.userService.getAllUsers()),
                tap(console.log),
                map(users => allUsersLoaded({users})),

            )

    );
}
