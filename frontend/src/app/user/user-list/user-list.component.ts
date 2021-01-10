import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { ResourceLoader } from '@angular/compiler';

import { AfterViewInit, Component, ViewChild, OnInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { AppState } from 'src/app/reducers';
import { UserEntityService } from '../store/user-entity.service';
// import { selectAll } from '../store/user.reducer';
// import { selectAllUsers } from '../store/user.selectors';
// import { usersUpload } from '../user.actions';
import { User } from '../user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class UserListComponent implements OnDestroy, OnInit, AfterViewInit{


  private _isDead$ = new Subject();

  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  tableColumns  :  string[] = [ 'select','nickName', 'lastName', 'firstName', 'email', 'tools'];

  users?: User[];

  users$?: Observable<User[]>;
  routeToDetail = 'users/userdetail';

  mode: 'Edit' | 'View' | 'Update' | undefined ;
  edit = false; // True : allow editiing (detail form)
  view = true; // True : allow view detail (view page)
  master = false; // true : button is disable
  owner = false; // true button is disable

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;


  constructor(
   // private userService: UserService,
    private router: Router,
    private store: Store<AppState>,
    private userEntityService: UserEntityService,
    ) { }




  ngOnInit(): void {
    this.reload();
  }

    ngOnDestroy(): void {
      this._isDead$.next();
    }

    ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  reload() {
    this.userEntityService.entities$.subscribe((objectResult) => {
      this.users = Object.values(objectResult)
      this.dataSource  =  new MatTableDataSource(this.users);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }

  onNavigate() {

  }

  // Goto the detail page for view only
  // navigate(id: String, index: String) {
  //   this.router.navigate([this.routeToDetail, id, 'view']);
  // }
  navigate(user: User, index: String) {
    console.log("route transfert" , user)
    this.router.navigate([this.routeToDetail, user, 'view']);
  }

  navigateButton(id: String, toEdit: Boolean) {
    // toEdit: 'true' | 'false';
    if (toEdit) {
      this.router.navigate([this.routeToDetail, id, 'edit']);
    } else {
      this.router.navigate([this.routeToDetail, id, 'view']);
    }
  }

  // Delete the selected item
  async remove( item: String ) {

  }

// Pseudo delete (flag delete)
  async virtualRemove( item: String ) {

  }
  // On click row action
  onRowClicked(row: Number) {
    console.log('Row clicked: ', row);
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  // Selection
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row: User): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'}`;
  }
}
