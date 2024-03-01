import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { BuyersService } from './buyers.service';
import { AlertsService } from '../../../../core/services/alerts.service';
import { enviroment } from '../../../../enviroments/enviroment';
import { Buyer } from './model';

describe('BuyersService', () => {
  let service: BuyersService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [BuyersService, AlertsService]
    });
    service = TestBed.inject(BuyersService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch buyers', () => {
    const mockBuyers: Buyer[] = [
      { 
        id: 1, 
        firstName: 'Buyer', 
        lastName: '1', 
        password: 'password1', 
        country: 'US', 
        email: 'buyer1@example.com', 
        rol: 'USER', 
        comision: '10', 
        token: 'token1', 
        courses: [], 
        inscriptions: [] 
      },
      { 
        id: 2, 
        firstName: 'Buyer', 
        lastName: '2', 
        password: 'password2', 
        country: 'UK', 
        email: 'buyer2@example.com', 
        rol: 'ADMIN', 
        comision: '20', 
        token: 'token2', 
        courses: [], 
        inscriptions: [] 
      }
    ];
  
    service.getBuyers().subscribe(buyers => {
      expect(buyers).toEqual(mockBuyers);
    });
  
    const req = httpTestingController.expectOne(`${enviroment.apiURL}/buyers`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockBuyers);
  });
  
});
