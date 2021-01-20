import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from './theme.service';
import { Option } from './option.model'
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {


  constructor(
    private themeService: ThemeService
  ) {}

  ngOnInit() {

  }

  isThemeDark!: Observable<boolean>

  @Input() options!: Array<Option>;
  @Output() themeChange: EventEmitter<string> = new EventEmitter<string>();

  changeTheme(themeToSet: string) {
    this.themeChange.emit(themeToSet);
  }

  toggleDarkTheme(checked: boolean) {
    this.themeService.setDarkTheme(checked);
  }

}
