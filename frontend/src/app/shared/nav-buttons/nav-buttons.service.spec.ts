import { TestBed } from '@angular/core/testing';

import { NavButtonsService } from './nav-buttons.service';

describe('NavButtonsService', () => {
  let service: NavButtonsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NavButtonsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
