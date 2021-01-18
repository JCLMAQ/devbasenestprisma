import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControlOptions } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { Router, ActivatedRoute } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { UserEntityService } from '../store/user-entity.service';
import { IUserRegister, Role, User } from '../user.model';
import { MustMatch } from '../validators/mustMatch.validator';
import { createPasswordStrengthValidator } from '../validators/password-strength.validator';
import { userEmailValidator, userNickNameValidator } from '../validators/user-async.validator';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  private errorMsg?: string;

  public user?: User;

  form!: FormGroup;
  id!: string;
  isAddMode!: boolean;
  isAdmin!: boolean; // Needed to be sure that the user has an Id
  loading = false;
  submitted = false;
  hidePassword = true;
  mode: 'create' | 'update' | 'view';
  formControls = {};

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private userEntityService: UserEntityService,
    private dateAdapter: DateAdapter<Date>,
    // private alertService: AlertService,
  ) {
    this.mode = 'view'
  }

  ngOnInit(){
    this.id = this.route.snapshot.params['id'];
    this.isAddMode = !this.id; // Only for User profil
    this.mode = this.route.snapshot.params['mode'];
    // if(this.mode == 'view' ) { this.form.disable()}
  console.log("mode: ", this.mode);
    // TODO verify isAdmin from the User logged
    this.isAdmin = false;
    // password not required in update mode
    const passwordValidators = [Validators.minLength(8)];
    if (this.isAddMode) {
        passwordValidators.push(Validators.required);
    }
    const formOptions: AbstractControlOptions = { validators: MustMatch('password', 'confirmPassword') };

    this.formControls = {
      title: ['', []],
      email: ['', {
            validators: [ Validators.required, Validators.email, ],
            asyncValidators: [userEmailValidator(this.userEntityService)],
            updateOn: 'blur'
            }],
      nickName: ['', {
            validators: [Validators.required, Validators.maxLength(10), Validators.minLength(3)],
            asyncValidators: [userNickNameValidator(this.userEntityService)],
            updateOn: 'blur'
            }],
      lastName: ['', ],
      firstName: ['', ],
      // validates date format yyyy-mm-dd : dob = date of birth
      dob: ['', []],
    };

    if (this.mode == 'update' || 'view') {
      this.form = this.fb.group(this.formControls);
      //   this.form.patchValue({...data.course});
      this.userEntityService.entities$
          .pipe(
            map((users :User[]) => users.find((user :User)=> user.id === this.id)))
          .subscribe((result) => {this.user = result} );
      this.form.patchValue({
        id: this.user?.id,
        title: this.user?.title,
        nickName: this.user?.nickName,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        dob: this.user?.dob
      });
      if(this.mode == 'view' ) { this.form.disable()}
    } else if (this.mode == 'create' || this.isAddMode ) {
      this.form = this.fb.group({
          ...this.formControls,
          password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
          confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
          role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
          acceptTerms: [false, Validators.requiredTrue]
      });
    }

    // this.form.valueChanges
    // .subscribe(val => {
    //     const dobDate = val.dob;
    //     val.dob = dobDate.toDateString();
    // });

  } // end of ngOnInit

  get formField() {

    return this.form.controls; }
  // get dob(): Date{
  //   return this.formControls[dob].toDateString()

  onSubmit() {
    this.submitted = true;
    // display form values on success
    alert('SUCCESS!! :-)\n\n' + JSON.stringify(this.form.value, null, 4));
    // reset alerts on submit
    // this.alertService.clear();
    // stop here if form is invalid
    if (this.form.invalid) {
      return;
    }
    this.loading = false
    if (this.mode == 'update') {
        this.save();
    } else {
        this.create();
    }
  }

  reload(id: string | undefined) {
    this.userEntityService.entities$
    .pipe(
      map((users :User[]) => users.find((user :User)=> user.id === this.id)))
    .subscribe((result) => {this.user = result} );
    if (this.mode == 'update' || 'view') {
    //   this.form.patchValue({...data.course})
      this.form.patchValue({
        id: this.user?.id,
        title: this.user?.title,
        nickName: this.user?.nickName,
        firstName: this.user?.firstName,
        lastName: this.user?.lastName,
        email: this.user?.email,
        dob: this.user?.dob
      });
    } else if (this.mode == 'create' || this.isAddMode ) {
      this.form = this.fb.group({
          ...this.formControls,
          password: ['', [Validators.minLength(8), this.isAddMode ? Validators.required : Validators.nullValidator,  createPasswordStrengthValidator(),]],
          confirmPassword: ['', this.isAddMode ? Validators.required : Validators.nullValidator],
          role: ['USER', this.isAdmin ? Validators.required : Validators.nullValidator],
          acceptTerms: [false, Validators.requiredTrue]
      });
    }
  }


  save() {
    const val = this.form.value;
    const dobIn = val.dob?.toISOString();
    console.log("dobIn: ", dobIn)
    // const user: User = {
    //     ...this.user,
    //     ...this.form.value,
    // };
    const user: User = {
      id: this.user?.id,
      title: val?.title,
      firstName: val?.firstName,
      lastName: val?.lastName,
      email: val.email,
      nickName: val?.nickName,
      dob: dobIn
    }

    console.log("User updated: ", user)
    console.log("dob ", this.user?.dob)
    if (this.mode == 'update') {
        this.userEntityService.update(user);
    } else if (this.mode == 'create') {

        this.userEntityService.add(user)
            .subscribe(
                // newUser => {
                //     console.log('New Usere', newUser);
                // }
            );

    }
    this.router.navigate(['users']);
}
  add() {}

  create() {}

  cancel() {}

  remove() {}

  reset() {}

  virtualRemove() {}

  next() {}

  last() {}

  first() {}

  previous() {}

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
