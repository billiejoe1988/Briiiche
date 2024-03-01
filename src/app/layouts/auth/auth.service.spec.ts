import { TestBed } from "@angular/core/testing";
import { AuthService } from "./auth.service";
import { HttpClientTestingModule, HttpTestingController } from "@angular/common/http/testing"
import { UserClean } from "../dashboard/pages/users/models/complete";

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

});
