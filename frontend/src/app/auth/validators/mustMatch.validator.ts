import { AbstractControl, FormGroup } from '@angular/forms';

// custom validator to check that two fields match
export function MustMatch(controlName: string, matchingControlName: string) {
    return (group: AbstractControl) => {
        const formGroup = <FormGroup>group;
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];

        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return null;
        }

        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        } else {
            matchingControl.setErrors(null);
        }

        return null;
    }
}

// custom validator to check if pwd match (match = eror)
export function MustNotMatch(controlName: string, matchingControlName: string) {
  return (group: AbstractControl) => {
      const formGroup = <FormGroup>group;
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];

      if (matchingControl.errors && !matchingControl.errors.mustMatch) {
          // return if another validator has already found an error on the matchingControl
          return null;
      }

      // set error on matchingControl if validation fails
      if (control.value == matchingControl.value) {
          matchingControl.setErrors({ mustNotMatch: true });
      } else {
          matchingControl.setErrors(null);
      }

      return null;
  }
}
// // custom validator to check that two fields match
// export function exMustMatch(controlName: string, matchingControlName: string) {
//   return (formGroup: FormGroup) => {
//       const control = formGroup.controls[controlName];
//       const matchingControl = formGroup.controls[matchingControlName];

//       if (matchingControl.errors && !matchingControl.errors.mustMatch) {
//           // return if another validator has already found an error on the matchingControl
//           return;
//       }

//       // set error on matchingControl if validation fails
//       if (control.value !== matchingControl.value) {
//           matchingControl.setErrors({ mustMatch: true });
//       } else {
//           matchingControl.setErrors(null);
//       }
//   }
// }
