import { Component, OnInit } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { ICurrentUser } from './auth/auth.model';
import { AuthService } from './auth/services/auth.service';
import { login, logout } from './auth/store/auth.actions';
import { isLoggedIn, isLoggedOut } from './auth/store/auth.selectors';
import { AppState } from './reducers';
import { ThemeService } from './shared/theme/theme.service';
// import { MarkerParser} from '@biesbjerg/ngx-translate-extract';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'devbasenestprisma frontend';
  loading : boolean = true;
  language = 'en'; // default

  // currentUser: any = { nickName: "JCM"};
  currentUser!: ICurrentUser | null;
  private unsubscribe$: Subject<void> = new Subject<void>();

  isLoggedIn$: Observable<boolean> | undefined;
  isLoggedOut$: Observable<boolean> | undefined;

  // private readonly stylesBasePath = `node_modules/@angular/material/prebuilt-themes/`;
  // DarkThem Management
  isDarkTheme: boolean = true;

// Example translate within ts file :
  // messageBoxContent = MarkerParser('messagebox.warning.text');

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public translate: TranslateService,
    private themeService: ThemeService,
    public authService: AuthService
    ) {
      translate.setDefaultLang('en');
      translate.use('en');
      translate.addLangs(['en','fr']);

      authService.currentUser$
      .pipe(
        takeUntil(this.unsubscribe$),
        tap(u => (this.currentUser = u)),
        tap(async (u) => {
// Ability to show menus # Access to the data or the page underneath that Menu -> Guard.service
          // this.canSeeTodosMenu = await authService.hasRole('BasicUsers');
          // this.canSeeUsersMenu = await authService.hasRole('Admin');
        }),
        tap((user) => {
          this.store.dispatch(login({ user }));
        })
      )
      .subscribe();
    this.authService.refreshUser();
    // this.store.subscribe(state => console.log('store value', state));


  }

  ngOnInit(){
    this.isLoggedIn$ = this.store
    .pipe(
     select(isLoggedIn)
    );
  this.isLoggedOut$ = this.store
    .pipe(
      select(isLoggedOut)
    );

  // mat-spinner control base on navigation events
    this.router.events.subscribe(event => {
      switch (true) {
          case event instanceof NavigationStart: {
              this.loading = true;
              break;
          }
          case event instanceof NavigationEnd:
          case event instanceof NavigationCancel:
          case event instanceof NavigationError: {
              this.loading = false;
              break;
          }
          default: {
              break;
          }
      }
    });
    this.themeService.getDarkThemeState().subscribe((value) => {
      this.isDarkTheme = value;
    })
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  // login() {}

  async logout() {
    localStorage.removeItem('authJwtToken');
    this.store.dispatch(logout());
    await this.authService.logout();
    this.router.navigate(['home']);
  }

  yourprofil() {
    this.router.navigate(['yourprofil']);
  }

  changepwd() {
    this.router.navigate(['changepwd']);
  }

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkThemeState(checked);
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }

}
