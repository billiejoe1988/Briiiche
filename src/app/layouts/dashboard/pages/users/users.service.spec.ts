import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UsersService } from './users.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { User } from './models';
import { enviroment } from '../../../../enviroments/enviroment';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UsersService, AlertsService],
    });
    service = TestBed.inject(UsersService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of users', () => {
    const mockUsers: User[] = [{ id: '1', firstName: 'John', lastName:'Wick', password: 'password', country: 'US', email: 'john@example.com', rol: 'USER', comision: 'sda2', token:'asdas', courses:[], inscriptions:[]}];

    service.getUsers().subscribe(users => {
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(`${enviroment.apiURL}/users`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });
});
