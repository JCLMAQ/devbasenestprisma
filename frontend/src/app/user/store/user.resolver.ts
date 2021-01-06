import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { filter, finalize, first, map, tap} from "rxjs/operators";
import { select } from '@ngrx/store'
import { AppState } from "../../reducers";
import { loadAllUsers } from "./user.actions";
import { areUsersLoaded } from "./user.selectors";


// resolver link to the router to load data before the page list opens
// Called by the router (see user-routing-module)
@Injectable()
export class UserResolver implements Resolve<any> {
  loading = false;

  constructor(private store: Store<AppState>) {
  }

  resolve(route: ActivatedRouteSnapshot,
          state: RouterStateSnapshot): Observable<any> {

      return this.store
        .pipe(
          select(areUsersLoaded),
          // select(areUsersLoaded),
          tap((usersLoaded) => {
            if(!this.loading && !usersLoaded){
              this.loading = true;
              this.store.dispatch(loadAllUsers());
            }
          }),
          // filter(usersLoaded => usersLoaded),
          first(),
          finalize(() => this.loading = false)
        )

      //   .pipe(
      //     select(areUsersLoaded),
      //     tap(coursesLoaded => {
      //         if (!this.loading && !coursesLoaded) {
      //             this.loading = true;
      //             this.store.dispatch(loadAllUsers());
      //         }
      //     }),
      //     filter(usersLoaded => usersLoaded),
      //     first(),
      //     finalize(() => this.loading = false)
      // );
    }

}
