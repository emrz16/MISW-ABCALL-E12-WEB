/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AgentDashboardComponent } from './agent-dashboard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrModule } from 'ngx-toastr';

describe('AgentDashboardComponent', () => {
  let component: AgentDashboardComponent;
  let fixture: ComponentFixture<AgentDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AgentDashboardComponent ],
      imports: [ReactiveFormsModule,
        HttpClientTestingModule,
        ToastrModule.forRoot() 
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AgentDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
