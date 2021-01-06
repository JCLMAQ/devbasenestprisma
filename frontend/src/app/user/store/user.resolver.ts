import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from "@angular/router";
import { Store } from "@ngrx/store";
import { Observable } from "rxjs";
import { finalize, first, tap } from "rxjs/operators";
import { AppState } from "../../reducers";
import { loadAllUsers } from "./user.actions";


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
          tap(() => {
            if(!this.loading){
              this.store.dispatch(loadAllUsers());
            }
          }),
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
