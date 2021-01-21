import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";


@Injectable()
export class ThemeService {
  constructor(
    private http: HttpClient,
  ) {

  }
  // darkMode switch
  private _themeDark: Subject<boolean> = new Subject<boolean>();
  isThemeDark = this._themeDark.asObservable();

  setDarkTheme(isThemeDark: boolean) {
    this._themeDark.next(isThemeDark);
  }

}

