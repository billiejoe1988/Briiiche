import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { InscriptionService } from './inscription.service';
import { enviroment } from "../../../../enviroments/enviroment";

describe('InscriptionService', () => {
  let service: InscriptionService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [InscriptionService]
    });
    service = TestBed.inject(InscriptionService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get inscriptions', () => {
    const mockInscriptions = [
      { id: 1, buyerId: 1, lastName: 'Smith', courseId: 1, courseName: 'Math' },
      { id: 2, buyerId: 2, lastName: 'Johnson', courseId: 2, courseName: 'Science' }
    ];

    service.getInscription().subscribe(inscriptions => {
      expect(inscriptions).toEqual(mockInscriptions);
    });

    const req = httpTestingController.expectOne(`${enviroment.apiURL}/inscriptions?_embed=buyer&_embed=course`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockInscriptions);
  });

  it('should create inscription', () => {
    const mockInscription = { id: 3, buyerId: 3, lastName: 'Williams', courseId: 3, courseName: 'English' };

    service.createInscription(mockInscription).subscribe(inscription => {
      expect(inscription).toEqual(mockInscription);
    });

    const req = httpTestingController.expectOne(`${enviroment.apiURL}/inscriptions`);
    expect(req.request.method).toEqual('POST');
    req.flush(mockInscription);
  });

  it('should delete inscription', () => {
    const inscriptionId = 1;

    service.deleteInscription(inscriptionId).subscribe(() => {
    });

    const req = httpTestingController.expectOne(`${enviroment.apiURL}/inscriptions/${inscriptionId}`);
    expect(req.request.method).toEqual('DELETE');
    req.flush({});
  });
});
