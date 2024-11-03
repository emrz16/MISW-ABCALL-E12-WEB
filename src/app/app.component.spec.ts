import { TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AppComponent],
      schemas: [NO_ERRORS_SCHEMA] // Ignorar templates para simplificar el test
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'abcall'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('abcall');
  });

  it('should render correct text in footer', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges(); 
    const compiled = fixture.nativeElement as HTMLElement;

    // Verifica que el texto del footer sea el esperado
    const footerText = compiled.querySelector('footer')?.textContent?.trim();
    expect(footerText).toBe('MISO - Tears of the devs Intregantes: Darío, Andrés, Inés, Emmanuel.  version 2.0.0');
  });
});
