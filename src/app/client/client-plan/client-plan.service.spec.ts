/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientPlanService } from './client-plan.service';

describe('Service: ClientPlan', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientPlanService]
    });
  });

  it('should ...', inject([ClientPlanService], (service: ClientPlanService) => {
    expect(service).toBeTruthy();
  }));
});
