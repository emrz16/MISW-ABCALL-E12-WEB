/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientService } from './client.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('Service: Client', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ClientService],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot() 
      ],
    });
  });

  it('should ...', inject([ClientService], (service: ClientService) => {
    expect(service).toBeTruthy();
  }));
});
