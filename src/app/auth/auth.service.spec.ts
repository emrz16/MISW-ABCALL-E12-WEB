import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { ClientsAuthService } from './auth.service';
import { environment } from '../../environments/environment';

describe('ClientsAuthService', () => {
  let service: ClientsAuthService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const mockApiUrl = `${environment.baseUrl}clients/login`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ClientsAuthService]
    });

    service = TestBed.inject(ClientsAuthService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    // Verifica que no haya solicitudes pendientes
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call login with correct URL and body', () => {
    const mockResponse = {
      msg: 'Login successful',
      token: '12345',
      client_id: '67890'
    };

    const email = 'test@example.com';
    const password = 'password123';

    service.login(email, password).subscribe((response) => {
      expect(response).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(mockApiUrl);

    // Verifica que se haya hecho la solicitud POST con el cuerpo correcto
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ email, password });

    // Simula la respuesta de la API
    req.flush(mockResponse);
  });
});
