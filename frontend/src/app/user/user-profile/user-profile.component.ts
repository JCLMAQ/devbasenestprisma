import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { IUserRegister } from '../user.model';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';



@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private errorMsg?: string;

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  isAdmin!: boolean;
  loading = false;
  submitted = false;
  hidePassword = true;

  userToRegister: IUserRegister = {
    email: '',
    password: '',
    confirmPassword: '',
    lastName: '',
    firstName: ''
  };

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    // private alertService: AlertService,
  ) {

  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id; // Only for User profil
    // TODO verify isAdmin from the User logged
    this.isAdmin = false;
    // password not required in edit mode
    const passwordValidators = [Validators.minLength(8)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };
    this.form = this.fb.group({
      email: ['', {
        validators: [ Validators.required, Validators.email, ],
        updateOn: 'blur'
        }],
      password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
      confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
      // title: ['', Validators.required],
      lastName: ['', ],
      firstName: ['', ],
      // validates date format yyyy-mm-dd : dob = date of birth
      // dob: ['', [Validators.required, Validators.pattern(/^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/)]],
      role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
      acceptTerms: [false, Validators.requiredTrue]
    }, formOptions );
    if (!this.isAddMode) {
      // Need to get data from the store
      // this.userService.getById(this.id)
      //     .pipe(first())
      //     .subscribe(x => this.form.patchValue(x));
  }
  }

  get email() { return this.form.controls['email'];}
  get password() {return this.form.controls['password'];}
  get verifyPassword() {return this.form.controls['verifyPassword'];}
  get lastName() {return this.form.controls['lastName'];}
  get firstName() {return this.form.controls['firstName'];}
  // convenience getter for easy access to form fields
  get formField() { return this.form.controls; }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.form.invalid) {
        return;
    }
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }

    this.loading = true;
    if (this.isAddMode) {
        this.createUser();
    } else {
        this.updateUser();
    }
  }

  private createUser() {}

  private updateUser() {}


  async register() {
    // try {
    //   const res = await this.registerService.register(userToRegister);
    //   if(res && res.errorMessage){
    //     alert(res.errorMessage);
    //   }
    // } catch (e) {
    //   alert('Désolé, une erreur a eu lieu empéchant votre enregistrement');
    // }
    this.router.navigate(['login']);
  }

  onReset() {
    this.submitted = false;
    this.form.reset();
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
