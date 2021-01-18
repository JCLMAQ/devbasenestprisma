import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { identifierModuleUrl } from '@angular/compiler';
import { UserEntityService } from '../store/user-entity.service';
import { from, Observable, of } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { createHostListener } from '@angular/compiler/src/core';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserDetailComponent implements OnInit {

  public user?: User;
  public users$: Observable<User[]>;
 // = new Observable(Object(User));
  public editingIndex!: string;
  public editing = false;

  public userForm =  new FormGroup({
    id: new FormControl(''),
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl('')
  });

 constructor(
  //  private http: HttpClient,
   private route: ActivatedRoute,
   private router: Router,
  //  private fb: FormBuilder,
   private userEntityService: UserEntityService,
 ) {
  //  this.user$ = this.userEntityService.entities$.pipe(
    // map(users => users.find(user => user.id == this.editingIndex))
  // )
  this.users$ = this.userEntityService.entities$
 }

 ngOnInit(): void {

  const routeParam = this.route.snapshot.paramMap.get('id');
    if (routeParam) {
      this.editingIndex = routeParam;
      this.editing = true;
      this.setEditForm();
    }
 }

 public setEditForm(){
  // Fetch data from the store
  // this.user$ = this.userEntityService.entities$.pipe(
  //   map(users => users.find(user => user.id == this.editingIndex))
  // )
  this.userEntityService.entities$
    .pipe(
      map((users :User[]) => users.find((user :User)=> user.id === this.editingIndex)))
    .subscribe((result) => {this.user = result} );
  this.userForm.patchValue({
    id: this.user?.id,
    firstName: this.user?.firstName,
    lastName: this.user?.lastName,
    email: this.user?.email,
  });
}

public onSubmit() {
  const userEditResult = this.userForm.value as User;

  if (this.editing) {
    // this.habits.splice(this.editingIndex, 1, habit);
  } else {
    // this.habits.push(habit);
  }
  this.exitForm();

  this.router.navigate(['/users']);
}
exitForm() {
  this.userForm.reset();
  this.editing = false;
}
}
