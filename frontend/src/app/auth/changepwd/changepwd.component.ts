import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';
import { MustMatch, MustNotMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {

  changepwdForm: FormGroup;
  hidePassword = true;
  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {
      const formOptions: AbstractControlOptions = { validators: [ MustMatch('newPassword', 'verifyPassword'), MustNotMatch('oldPassword', 'newPassword') ]};
      this.changepwdForm = fb.group({
          oldPassword: ['', [Validators.required]],
          newPassword: ['', [
            Validators.required,
            Validators.minLength(8),
            createPasswordStrengthValidator(),
            ]],
          verifyPassword: ['', [Validators.required]]
      }, formOptions);

  }

  ngOnInit(): void {

  }

  get oldPassword() {
    return this.changepwdForm.get('oldPassword');
  }

  get newPassword() {
    return this.changepwdForm.get('newPassword');
  }

  get verifyPassword() {
    return this.changepwdForm.get('verifyPassword');
  }

  changePwd() {}

  backhome() {
    this.router.navigate(['home']);
  }
}
