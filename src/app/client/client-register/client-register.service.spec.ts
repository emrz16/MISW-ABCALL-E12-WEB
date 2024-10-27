/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ClientRegisterService } from './client-register.service';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ToastrModule } from 'ngx-toastr';

describe('Service: ClientRegister', () => {
  beforeEach(() => {
    
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        HttpClientTestingModule,
        RouterTestingModule,
        ToastrModule.forRoot() // Proporciona ToastrModule con configuración predeterminada
      ],
      providers: [ClientRegisterService]
    });
  });

  it('should ...', inject([ClientRegisterService], (service: ClientRegisterService) => {
    expect(service).toBeTruthy();
  }));
});
