import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
hidePassword = true;
loginForm = this.fb.group({
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
      )
      {

      }

  ngOnInit(): void {

  }

  get email() {
    return this.loginForm.controls['email'];
}

  get password() {
    return this.loginForm.controls['password'];
}

 login() {

 }

 cancelLogin() {}
}
