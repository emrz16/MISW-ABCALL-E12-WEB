import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { IncidenciaService, Incidencia, IncidentSuggestionResponse } from './incidencia.service';
import { HttpHeaders } from '@angular/common/http';

describe('IncidenciaService', () => {
  let service: IncidenciaService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [IncidenciaService]
    });
    service = TestBed.inject(IncidenciaService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call crearIncidencia and return success', () => {
    const mockIncidencia: Incidencia = {
      agent_id: 'A123',
      description: 'Test description',
      date: '2024-10-20',
      registration_medium: 'web',
      user_id: 1,
      client_id: 'C456'
    };

    const mockResponse = { success: true };

    service.crearIncidencia(mockIncidencia).subscribe(response => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(service['apiUrl']);
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toContain('Bearer');
    req.flush(mockResponse);
  });

  it('should call getIncidentSuggestion and return suggestion', () => {
    const mockSuggestion: IncidentSuggestionResponse = {
      incident_id: 'I123',
      description: 'Test incident',
      possible_solution: 'Test solution'
    };

    const incidentId = 'I123';

    service.getIncidentSuggestion(incidentId).subscribe(suggestion => {
      expect(suggestion).toEqual(mockSuggestion);
    });

    const req = httpMock.expectOne(service['apiUrlSuggestions'] + incidentId + "/solution");
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toContain('Bearer');
    req.flush(mockSuggestion);
  });

  it('should handle errors', () => {
    const mockError = new ErrorEvent('Network error');

    service.crearIncidencia({
      agent_id: 'A123',
      description: 'Test description',
      date: '2024-10-20',
      registration_medium: 'web',
      user_id: 1,
      client_id: 'C456'
    }).subscribe({
      error: (errorMessage) => {
        expect(errorMessage).toBe('Algo malo sucedió; por favor, intenta de nuevo más tarde.');
      }
    });

    const req = httpMock.expectOne(service['apiUrl']);
    req.error(mockError);  // Simula un error de red
  });
});
