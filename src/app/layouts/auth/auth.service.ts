import { Injectable } from "@angular/core";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { AlertsService } from "../../core/services/alerts.service";
import { of, delay, map, finalize } from "rxjs";
import { LoadingService } from "../../core/services/loading.service";

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable ({providedIn: 'root'})
export class AuthService {
    authUser: User | null = null;

    constructor(private router: Router, private alertsService: AlertsService, private loadingService: LoadingService ) {
    }

    login (data: LoginData): void {
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
         
        if (data.email === MOCK_USER.email && data.password === MOCK_USER.password ) {
            this.authUser = MOCK_USER;
            localStorage.setItem('token', 'aasdas12312asd123');
            this.router.navigate(['dashboard']);
        } else {
            this.alertsService.showError('Error', 'Invalid Email or Password');
        }
    }

    logout(): void {
        this.authUser = null ;
        this.router.navigate(['auth', 'login']);
    }

    verifyToken() {
        this.loadingService.setIsLoading(true);
        return of(localStorage.getItem('token')).pipe(
            delay(1000),
            map((response) => !!response),
            finalize(() => this.loadingService.setIsLoading(false))
        );
    }
}