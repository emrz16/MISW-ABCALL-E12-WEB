/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AgenteService } from './agente.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('Service: Agente', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgenteService],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot() 
      ],
    });
  });

  it('should ...', inject([AgenteService], (service: AgenteService) => {
    expect(service).toBeTruthy();
  }));
});
