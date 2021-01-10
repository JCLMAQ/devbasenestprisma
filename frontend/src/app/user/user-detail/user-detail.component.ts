import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { identifierModuleUrl } from '@angular/compiler';
import { UserEntityService } from '../store/user-entity.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public user?: User;
  public user$?: Observable<User>
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
   private store:  Store<AppState>
 ) {}

 ngOnInit(): void {

  // const routeParam = this.route.snapshot.paramMap.get('id');
  const routeParam = this.route.snapshot.paramMap.get('user');
console.log("route param: " ,  routeParam)
    if (routeParam) {
      this.editingIndex = routeParam;
      this.editing = true;
      this.setEditForm();
    }

 }


 getCurrentValue(id: string): Observable<User>{
  return this.store.select(appState => appState.user)
    .filter(Boolean);
}

 public setEditForm() {
   console.log("this.EditingIndex: ", this.editingIndex)
  // const user: User = await this.userEntityService.getOneUser(this.editingIndex)
  const userbis = this.userEntityService.getByKey(this.editingIndex).toPromise();
  console.log(" userbis", userbis)
  // this.userEntityService.getByKey(this.editingIndex).subscribe(
  //   (objectResult) => {
  //     this.user = objectResult
  //   });
console.log("user fetch result : ", this.user)
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
