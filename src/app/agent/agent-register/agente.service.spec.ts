/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgenteService } from './agente.service';

describe('Service: Agente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgenteService]
    });
  });

  it('should ...', inject([AgenteService], (service: AgenteService) => {
    expect(service).toBeTruthy();
  }));
});
