import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private authService: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['email@email.com', [Validators.required, Validators.email]],
          password: ['email', [Validators.required]]
      });

  }

  ngOnInit(): void {

  }
 login() {

 }

 cancelLogin() {}
}
