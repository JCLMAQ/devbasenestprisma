import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { AuthService } from '../services/auth.service';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
  selector: 'app-resetpwd',
  templateUrl: './resetpwd.component.html',
  styleUrls: ['./resetpwd.component.scss']
})
export class ResetpwdComponent implements OnInit {

    hidePassword = true;
    hideConfirmPassword = true;

    resetpwdForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router:Router,
    private store: Store<AppState>
  ) {
    const formOptions: AbstractControlOptions = { validators: MustMatch('newPassword', 'confirmNewPassword') };
    this.resetpwdForm = fb.group({
      newPassword: ['', [
        Validators.required,
        Validators.minLength(8),
        createPasswordStrengthValidator(),
        ]],
      confirmNewPassword: ['', [Validators.required]]
    },
    formOptions );
  }

  ngOnInit(): void {
  }

  get newPassword() {
    return this.resetpwdForm.controls['newPassword'];
}

get confirmNewPassword() {
  return this.resetpwdForm.controls['confirmNewPassword'];
}

  resetPwd() {

  }

  backhome() {
    this.router.navigate(['home']);
  }

}
