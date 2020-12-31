import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-nav-buttons',
  templateUrl: './nav-buttons.component.html',
  styleUrls: ['./nav-buttons.component.scss']
})
export class NavButtonsComponent implements OnInit {
  action: string;
  // Management of buttons Component
   @Input() editable: boolean;
   @Input() editButton: boolean;
   @Input() removeButton: boolean;
   @Input() virtualDeleteButton: boolean;
  //  @Input() navigable: NavigableButtonsService;


  // Return action
   @Output() actionButton = new EventEmitter<string>();

    constructor(
      // public navigable: NavigableButtonsService
    ) {
      this.editable = false;
      this.editButton = false;
      this.removeButton = false;
      this.virtualDeleteButton = false;
      this.action = '';
    }

    ngOnInit() {

    }

  actionClick(action: string) {
    this.actionButton.emit(action);
  }

}
