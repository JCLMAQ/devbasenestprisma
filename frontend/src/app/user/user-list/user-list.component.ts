import { animate, state, style, transition, trigger } from '@angular/animations';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';
import { first } from 'rxjs/operators';
import { AppState } from '../../reducers';
import { UserEntityService } from '../store/user-entity.service';
// import { selectAll } from '../store/user.reducer';
// import { selectAllUsers } from '../store/user.selectors';
// import { usersUpload } from '../user.actions';
import { User } from '../user.model';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';


@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
    animations: [
        trigger('detailExpand', [
            state('collapsed', style({ height: '0px', minHeight: '0' })),
            state('expanded', style({ height: '*' })),
            transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
        ]),
    ],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatTableModule, MatSortModule, MatCheckboxModule, MatButtonModule, MatIconModule, MatPaginatorModule]
})
export class UserListComponent implements OnDestroy, OnInit, AfterViewInit{


  private _isDead$ = new Subject();

  dataSource!: MatTableDataSource<User>;
  selection = new SelectionModel<User>(true, []);
  tableColumns  :  string[] = [ 'select','nickName', 'lastName', 'firstName', 'email', 'tools'];

  users?: User[];

  users$?: Observable<User[]>;
  routeToDetail = 'users/userprofile';

  mode: 'Edit' | 'View' | 'Update' | undefined ;
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
    // this._isDead$.next();
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
    // console.log("route transfert" , user)
    this.router.navigate([this.routeToDetail, user, 'view']);
  }

  navigateButton(id: String, mode: string) {
    // mode: 'view' | 'update' | 'create';
      this.router.navigate([this.routeToDetail, id, mode]);
  }

  addOneUser() {
    this.router.navigate([this.routeToDetail, '', 'create']);
  }
  // Delete the selected item
  async remove( id: String ) {
    // const user = this.userEntityService.delete(user.id = id)
  }

  virtualRemove(id: string) {
    const user = this.userEntityService.getByKey(id)
    .pipe(first()).subscribe(user => user.isDeleted = new Date());
  }
  // MatTable mgt
  // On click row action
  onRowClicked(row: Number) {
    // console.log('Row clicked: ', row);
  }
  // Filter the list
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
