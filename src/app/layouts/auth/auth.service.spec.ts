import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { User } from "../dashboard/pages/users/models";

describe('test to AuthService', () => {
    let authService: AuthService;
    let httpController : HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [AuthService],
            imports:[HttpClientTestingModule]
        });
        authService = TestBed.inject(AuthService);
        httpController = TestBed.inject(HttpTestingController)
    });
    
    it ('AuthService its defined', () => {
        expect(authService).toBeTruthy();
    });

    it('Al llamar a login () debe establecer un auth user', () => {

      const MOCK_RESPONSE: User[] = [
       {
        id: 23,
        firstName: 'mockname',
        lastName: 'mocklast',
        password: 'password',
        country: 'argentina',
        email: 'mock@mail.com',
        rol: 'ADMIN',
        comision: 'Pastry God',
        token: 'f12'
       }
      ]

      authService.login ({ email: 'mock@mail.com', password: 'password' }).subscribe({
        next: () => {
            expect(authService.authUser).toEqual(MOCK_RESPONSE[0]);
        },
      });

      httpController.expectOne({ url: 'http://localhost:3000/users?email=mock@mail.com&password=password',
      method: 'GET',
    }).flush(MOCK_RESPONSE);

   });
});
