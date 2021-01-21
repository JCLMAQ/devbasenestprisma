import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from './theme.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  isDarkTheme!: boolean;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.themeService.getDarkThemeState().subscribe((value) => {
      this.isDarkTheme = value;
    })
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkThemeState(checked);
  }

}
