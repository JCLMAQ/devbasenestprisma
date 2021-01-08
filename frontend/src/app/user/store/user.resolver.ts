import { Injectable } from "@angular/core";
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { Observable } from "rxjs";
import { tap, filter, first, map } from "rxjs/operators";
import { UserEntityService } from "./user-entity.service";


@Injectable()
export class UserResolver implements Resolve<boolean> {

    constructor(
      private usersEntityService: UserEntityService)
       { }

    resolve(route: ActivatedRouteSnapshot,
            state: RouterStateSnapshot): Observable<boolean> {

              // return this.usersEntityService.getAll()
              // .pipe(
              //   map( users => !!users)
              // )
        return this.usersEntityService.loaded$
            .pipe(
                tap(loaded => {
                    if (!loaded) {
                      this.usersEntityService.getAll();
                    }
                }),
                filter(loaded => !!loaded),
                first()
            );

    }

}
