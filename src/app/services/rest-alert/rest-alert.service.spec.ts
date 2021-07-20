import { TestBed } from '@angular/core/testing';

import { RestAlertService } from './rest-alert.service';

describe('RestAlertService', () => {
  let service: RestAlertService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RestAlertService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
