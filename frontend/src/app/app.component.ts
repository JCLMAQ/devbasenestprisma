import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BehaviorSubject, Observable, of as observableOf, of } from 'rxjs';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';
import { TranslateService } from '@ngx-translate/core';
import { ThemeService } from './shared/theme/theme.service';

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

  private readonly stylesBasePath = `node_modules/@angular/material/prebuilt-themes/`;
  // DarkThem Management
  isThemeDark: Observable<boolean>;

  constructor(
    private router: Router,
    private store: Store<AppState>,
    public translate: TranslateService,
    private themeService: ThemeService ) {
      translate.setDefaultLang('en');
      translate.use('en');
      translate.addLangs(['en','fr']);
      this.isThemeDark = of(false);
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

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
