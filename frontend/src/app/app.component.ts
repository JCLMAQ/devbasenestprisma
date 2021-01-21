import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/theme/theme.service';
import options from "./shared/theme/options.json";
import { Option } from './shared/theme/option.model'
import { StyleManagerService } from './shared/theme/style-manager.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'frontend';
  loading = true;
  language = 'en'; // default

  // currentUser: any = { nickName: "JCM"};
  currentUser: any = undefined;

  // Theme management
  options$: Observable<Array<Option>> = this.themeService.getThemeOptions();

  private readonly stylesBasePath = `node_modules/@angular/material/prebuilt-themes/`;
 // DarkThem Management
  // isThemeDark = new BehaviorSubject<boolean>(false);
  isThemeDark: Observable<boolean> = new Observable()

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public translate: TranslateService,
    private readonly styleManager: StyleManagerService,
    private themeService: ThemeService ) {
      translate.setDefaultLang('en');
      translate.use('en');
      translate.addLangs(['en','fr']);
  }

  ngOnInit(){
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
    this.themeService.setTheme("deeppurple-amber");

    this.isThemeDark = this.themeService.isThemeDark;
  }

  switchLang(lang: string) {
    this.translate.use(lang);
  }

  login() {}
  logout() {}

  yourprofil() {
    this.router.navigate(['yourprofil']);
  }

  changepwd() {
    this.router.navigate(['changepwd']);
  }

  navigate(route: string) {
    this.router.navigate([`/${route}`]);
  }

  themeChangeHandler(themeToSet: string) {
    this.themeService.setTheme(themeToSet);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
