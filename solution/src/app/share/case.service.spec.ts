/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { CaseService } from './case.service';

describe('CaseService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CaseService]
    });
  });

  it('should ...', inject([CaseService], (service: CaseService) => {
    expect(service).toBeTruthy();
  }));
});
