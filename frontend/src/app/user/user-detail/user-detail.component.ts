import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms'
import { identifierModuleUrl } from '@angular/compiler';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {

  public user?: User;
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
   private userService: UserService,
 ) {}

 ngOnInit(): void {

  const routeParam = this.route.snapshot.paramMap.get('id');

    if (routeParam) {
      this.editingIndex = routeParam;
      this.editing = true;
      this.setEditForm();
    }

 }


 public async setEditForm() {
  const user: User = await this.userService.getOneUser(this.editingIndex)
console.log("user fetch result : ", user.id)
  this.userForm.patchValue({
    id: user?.id,
    firstName: user?.firstName,
    lastName: user?.lastName,
    email: user?.email,
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
