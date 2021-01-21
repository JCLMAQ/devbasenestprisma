import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Option } from "./option.model";
import { BehaviorSubject, Observable, of, Subject } from "rxjs";

import { StyleManagerService } from "./style-manager.service";

@Injectable()
export class ThemeService {
  constructor(
    private http: HttpClient,
    private styleManager: StyleManagerService
  ) {

  }

  // Thme menu switch
  getThemeOptions(): Observable<Array<Option>> {
    // const getTheme = this.http.get<Array<Option>>("./options.json");
    // console.log(getTheme)
    return this.http.get<Array<Option>>("./options.json");
  }

  setTheme(themeToSet: string) {
    // this.styleManager.setStyle(
    //   "theme",
    //   `node_modules/@angular/material/prebuilt-themes/${themeToSet}.scss`
    // );
  }

  // darkMode switch
  private _themeDark: Subject<boolean> = new Subject<boolean>();
  isThemeDark = this._themeDark.asObservable();

  setDarkTheme(isThemeDark: boolean) {
    this._themeDark.next(isThemeDark);
  }

}

