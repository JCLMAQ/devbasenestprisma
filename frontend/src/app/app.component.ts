import { Component } from '@angular/core';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {distinctUntilChanged, map} from 'rxjs/operators';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import { AppState } from './reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'frontend';
  loading = true;

  constructor(private router: Router,
    private store: Store<AppState>) {
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
}

}
