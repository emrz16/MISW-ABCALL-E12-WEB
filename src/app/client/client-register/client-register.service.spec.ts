/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientRegisterService } from './client-register.service';

describe('Service: ClientRegister', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientRegisterService]
    });
  });

  it('should ...', inject([ClientRegisterService], (service: ClientRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
