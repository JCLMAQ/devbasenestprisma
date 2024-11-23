import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from './theme.service';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of as observableOf} from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';

@Component({
    selector: 'app-theme',
    templateUrl: './theme.component.html',
    styleUrls: ['./theme.component.scss'],
    imports: [MatButtonModule, MatMenuModule, MatIconModule, MatCheckboxModule, FormsModule]
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
