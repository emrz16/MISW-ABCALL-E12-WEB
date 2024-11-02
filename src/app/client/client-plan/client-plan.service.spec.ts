/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientPlanService } from './client-plan.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('Service: ClientPlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports : [HttpClientTestingModule],
      providers: [ClientPlanService]
    });
  });

  it('should ...', inject([ClientPlanService], (service: ClientPlanService) => {
    expect(service).toBeTruthy();
  }));
});
