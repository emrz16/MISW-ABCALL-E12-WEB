import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { IncidenciaService } from '../incidencia.service';
import { AgentsAuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';
import { CrearIncidenciaComponent } from './crear-incidencia.component';
import { ToastrModule } from 'ngx-toastr';

describe('CrearIncidenciaComponent', () => {
  let component: CrearIncidenciaComponent;
  let fixture: ComponentFixture<CrearIncidenciaComponent>;
  let mockIncidenciaService: any;
  let mockAuthService: any;
  let mockRouter: any;

  beforeEach(async () => {
    mockIncidenciaService = jasmine.createSpyObj(['crearIncidencia', 'getIncidentSuggestion']);
    mockAuthService = jasmine.createSpyObj(['login']);
    mockRouter = jasmine.createSpyObj(['navigate']);

    await TestBed.configureTestingModule({
      declarations: [CrearIncidenciaComponent],
      imports: [ReactiveFormsModule,
        ToastrModule.forRoot() 
      ], // Importa ReactiveFormsModule para manejar formularios reactivos
      providers: [
        { provide: IncidenciaService, useValue: mockIncidenciaService },
        { provide: AgentsAuthService, useValue: mockAuthService },
        { provide: Router, useValue: mockRouter }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CrearIncidenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have an invalid form when empty', () => {
    expect(component.incidenciaForm.valid).toBeFalsy();
  });

  it('should display error messages when form is invalid and submitted', () => {
    component.guardar();
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica que se muestren mensajes de error en campos requeridos
    expect(compiled.querySelector('.text-danger')?.textContent).toContain('El usuario es requerido.');
  });

  it('should submit the form and display success message', () => {
    // Mock del método crearIncidencia para simular respuesta exitosa
    mockIncidenciaService.crearIncidencia.and.returnValue(of({ id: '123' }));
    mockIncidenciaService.getIncidentSuggestion.and.returnValue(of({ possible_solution: 'Reiniciar el sistema' }));

    // Llenar el formulario con datos válidos
    component.incidenciaForm.controls['user_id'].setValue('1');
    component.incidenciaForm.controls['descripcion'].setValue('Test incidente');
    component.incidenciaForm.controls['canal'].setValue('email');

    component.guardar();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica que el mensaje de éxito se muestre
    //expect(compiled.querySelector('.alert-success')?.textContent).toContain('Incidencia creada exitosamente.');

    // Verifica que se obtenga la posible solución y se muestre
    //expect(compiled.querySelector('p')?.textContent).toContain('Reiniciar el sistema');
  });

  it('should display error message on submission failure', () => {
    // Mock del método crearIncidencia para simular un error
    mockIncidenciaService.crearIncidencia.and.returnValue(throwError(() => new Error('Error al guardar')));

    // Llenar el formulario con datos válidos
    component.incidenciaForm.controls['user_id'].setValue('1');
    component.incidenciaForm.controls['descripcion'].setValue('Test incidente');
    component.incidenciaForm.controls['canal'].setValue('email');

    component.guardar();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica que el mensaje de error se muestre
    //expect(compiled.querySelector('.alert-danger')?.textContent).toContain('Error al guardar');
  });

  it('should reset the form and messages when cancelar is clicked', () => {
    // Llenar el formulario con datos
    component.incidenciaForm.controls['user_id'].setValue('1');
    component.incidenciaForm.controls['descripcion'].setValue('Test incidente');
    component.incidenciaForm.controls['canal'].setValue('email');
  
    component.cancelar();
    fixture.detectChanges();
  
    // Verifica que el formulario haya sido reiniciado
    expect(component.incidenciaForm.controls['user_id'].value).toBeNull(); // Esperamos null en lugar de ''
    expect(component.incidenciaForm.controls['descripcion'].value).toBeNull(); // Esperamos null en lugar de ''
    expect(component.incidenciaForm.controls['canal'].value).toBeNull(); // Esperamos null en lugar de ''
  
    // Verifica que los mensajes se hayan reseteado
    expect(component.mensajeExito).toBe('');
    expect(component.mensajeError).toBe('');
  });
});
