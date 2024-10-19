import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultaIncidenciasComponent } from './consulta-incidencias.component';

describe('ConsultaIncidenciasComponent', () => {
  let component: ConsultaIncidenciasComponent;
  let fixture: ComponentFixture<ConsultaIncidenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsultaIncidenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsultaIncidenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
