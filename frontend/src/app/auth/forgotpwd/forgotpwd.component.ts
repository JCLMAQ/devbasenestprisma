import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-forgotpwd',
  templateUrl: './forgotpwd.component.html',
  styleUrls: ['./forgotpwd.component.scss']
})
export class ForgotpwdComponent implements OnInit {

  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['email@email.com', [
        Validators.required,
        Validators.email
      ]]
    });
  }

  ngOnInit(): void {

  }

  get email() {
    return this.form.get('email');
  }

  async sendforget() {
    // const res = await this.authService.sendEmailForgotPwd(email.value);
    // alert(res.message);
    // this.router.navigate(['portal']);
  }
}
