import { Component, OnInit } from '@angular/core';
import { AbstractControlOptions, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IUserRegister } from '../auth.model';
import { RegisterService } from '../register.service';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private errorMsg?: string;

  registerForm!: FormGroup;
  loading = false;
  submitted = false;
  hidePassword = true;
  hideConfirmPassword = true;

  userToRegister: IUserRegister = {
    email: '',
    password: '',
    confirmPassword: '',
    lastName: '',
    firstName: ''
  };

  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router,
    private route: ActivatedRoute,
    // private alertService: AlertService,
  ) {

  }

  ngOnInit(){

    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };

    this.registerForm = this.fb.group({
      email: ['', {
        validators: [ Validators.required, Validators.email, ],
        updateOn: 'blur'
        }],
      password: ['', [ Validators.minLength(8), Validators.required, createPasswordStrengthValidator()]],
      confirmPassword: ['', Validators.required],
      nickName: ['', ],
      lastName: ['', ],
      firstName: ['', ],
      acceptTerms: [false, Validators.requiredTrue]
    }, formOptions );

  }

  get email() { return this.registerForm.controls['email'];}
  get password() {return this.registerForm.controls['password'];}
  get confirmPassword() {return this.registerForm.controls['confirmPassword'];}
  get lastName() {return this.registerForm.controls['lastName'];}
  get firstName() {return this.registerForm.controls['firstName'];}
  // convenience getter for easy access to form fields
  get formField() { return this.registerForm.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.registerForm.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.registerForm.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid

    this.loading = true;

    this.register();
  }

  async register() {
    // try {
    //   const res = await this.registerService.register(userToRegister);
    //   if(res && res.errorMessage){
    //     alert(res.errorMessage);
    //   }
    // } catch (e) {
    //   alert('Désolé, une erreur a eu lieu empéchant votre enregistrement');
    // }
    this.login();
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }

  login() {
    this.router.navigate(['login']);
  }

  backHome() {
    this.router.navigate(['home']);
  }

  cancelRegister() {
    this.router.navigate(['home'])
  }

}
