import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppState } from '@app/reducers';
import { Store } from '@ngrx/store';
import { AuthService } from '../auth.service';

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
    this.resetpwdForm = fb.group({
      newPassword: ['', [Validators.required]],
      confirmNewPassword: ['', [Validators.required]]
  });
  }

  ngOnInit(): void {
  }

}
