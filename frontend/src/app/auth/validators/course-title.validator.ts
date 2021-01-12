import {AbstractControl, AsyncValidatorFn} from '@angular/forms';

import {map} from 'rxjs/operators';
import { UserEntityService } from 'src/app/user/store/user-entity.service';


export function courseTitleValidator(users: UserEntityService):AsyncValidatorFn  {
    return (control: AbstractControl) => {
        return users.entities$
            .pipe(
                map(users => {

                    const user = users.find(
                        user => user.lastName?.toLowerCase()
                            == control.value.toLowerCase() );

                    return user ? {userExists:true} : null;

                })
            )

    }
}
