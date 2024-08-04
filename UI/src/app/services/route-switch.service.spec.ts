import { TestBed } from '@angular/core/testing';

import { RouteSwitchService } from './route-switch.service';

describe('RouteSwitchService', () => {
  let service: RouteSwitchService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RouteSwitchService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
