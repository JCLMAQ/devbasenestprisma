import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from './theme.service';
import { Option } from './option.model'
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of as observableOf} from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  isThemeDark: Observable<boolean> | undefined;

  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit() {
    this.isThemeDark = this.themeService.isThemeDark;
  }

  @Input() options!: Array<Option>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  changeTheme(themeToSet: string) {
    this.themeChange.emit(themeToSet);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
