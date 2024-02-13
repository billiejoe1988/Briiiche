import { Injectable } from "@angular/core";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { AlertsService } from "../../core/services/alerts.service";
import { of, delay, map, finalize, tap } from "rxjs";
import { LoadingService } from "../../core/services/loading.service";

interface LoginData {
  email: null | string;
  password: null | string;
}

const MOCK_USER = {
    id:48,
    email:'a@gmail.com',
    firstName: 'Fake',
    lastName: 'Name',
    rol: 'ADMIN',
    password: '1234',
    country: 'argentina',
    comision:'CuisinePro',
};

@Injectable ({providedIn: 'root'})
export class AuthService {
    authUser: User | null = null;

    constructor(private router: Router, private alertsService: AlertsService, private loadingService: LoadingService ) {
    }
    
    private setAuthUser (mockUser: User ): void{
    
    this.authUser = mockUser;
    localStorage.setItem('token', 'aasdas12312asd123');

    }

    login (data: LoginData): void {
         
        if (data.email === MOCK_USER.email && data.password === MOCK_USER.password ) {
            this.setAuthUser(MOCK_USER);
            this.router.navigate(['dashboard']);
        } else {
            this.alertsService.showError('Error', 'Invalid Email or Password');
        }
    }

    logout(): void {
        this.authUser = null ;
        this.router.navigate(['auth', 'login']);
        localStorage.removeItem('token');
    }

    verifyToken() {
        this.loadingService.setIsLoading(true);
        return of(localStorage.getItem('token')).pipe(
            delay(1000),
            map((response) => !!response),
            tap(() => {
                this.setAuthUser(MOCK_USER);
            }),
            finalize(() => this.loadingService.setIsLoading(false))
        );
    }
}