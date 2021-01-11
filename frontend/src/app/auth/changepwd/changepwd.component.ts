import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-changepwd',
  templateUrl: './changepwd.component.html',
  styleUrls: ['./changepwd.component.scss']
})
export class ChangepwdComponent implements OnInit {

  form: FormGroup;

  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          oldpassword: ['oldpwd', [Validators.required]],
          newpassword: ['newpwd', [Validators.required]],
          verifypassword: ['verifpwd', [Validators.required]]
      });

  }

  ngOnInit(): void {
  }

  changePwd() {}

  backHome() {}
}
