import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hidePassword = true;
form = this.fb.group({
    email: ['',{
      validators: [ Validators.required, Validators.email, ],
      updateOn: 'blur'
      }
    ],
    password: ['', [
      Validators.required,
      Validators.minLength(8),
      createPasswordStrengthValidator(),
      ]
    ]
});

  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router:Router,
      private store: Store<AppState>
      )
      {

      }

  ngOnInit(): void {

  }

  get email() {
    return this.form.controls['email'];
}

  get password() {
    return this.form.controls['password'];
}

 login() {

 }

 cancelLogin() {}
}
