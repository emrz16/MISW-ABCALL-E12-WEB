/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BoardService } from './board.service';
import { environment } from '../../environments/environment.development';
import { Board } from './Board';


describe('BoardService', () => {
  let service: BoardService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  const mockApiUrl = `${environment.baseUrl}reports/`;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BoardService]
    });

    service = TestBed.inject(BoardService);
    httpMock = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call getBoard with correct URL and headers', () => {
    const mockBoardResponse: Board = {
      // 
      client:{
        id: '1',
        name: 'Test Client',
        email: 'test_client@gmail.com',
        company_name: 'Test Company',
        created_at: '2021-01-01T00:00:00Z',
        updated_at: '2021-01-01T00:00:00Z',
        plan: null
      },
      stats: {
        average_response_time: '15 Mins',  
        total_phone_incidents: 5,  
        total_email_incidents: 7,  
        total_chat_incidents: 9,  
        compliance_rate: 50, 
        total_incidents: 10,
        total_open_incidents: 5,
        total_closed_incidents: 3,
        average_resolution_time: '1 hour'
      },
      ia_response: {
        msg: 'Success'
      },
      incidents: []
      // etc.
    };

    const token = '12345';
    const client_id = '67890';

    service.getBoard(token, client_id).subscribe((response) => {
      expect(response).toEqual(mockBoardResponse);
    });

    const req = httpMock.expectOne(`${mockApiUrl}${client_id}`);

    // Verifica que se haya hecho la solicitud POST con el encabezado correcto
    expect(req.request.method).toBe('POST');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${token}`);
    expect(req.request.body).toBeNull();  // Verifica que no haya un body enviado

    // Simula la respuesta de la API
    req.flush(mockBoardResponse);
  });
});