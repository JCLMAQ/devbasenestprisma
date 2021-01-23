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

  changepwdForm: FormGroup;
  hidePassword = true;
  constructor(
      private fb:FormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.changepwdForm = fb.group({
          oldpassword: ['', [Validators.required]],
          newpassword: ['', [Validators.required]],
          verifypassword: ['', [Validators.required]]
      });

  }

  ngOnInit(): void {

  }

  get oldpassword() {
    return this.changepwdForm.get('oldpassword');
  }

  get newpassword() {
    return this.changepwdForm.get('newpassword');
  }

  get verifypassword() {
    return this.changepwdForm.get('verifypassword');
  }

  changePwd() {}

  backhome() {
    this.router.navigate(['home']);
  }
}
