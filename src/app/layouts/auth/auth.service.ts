import { Injectable } from "@angular/core";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { AlertsService } from "../../core/services/alerts.service";

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable ({providedIn: 'root'})
export class AuthService {
    authUser: User | null = null;

    constructor(private router: Router, private alertsService: AlertsService ) {
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
            this.router.navigate(['dashboard']);
        } else {
            this.alertsService.showError('Error', 'Invalid Email or Password');
        }
    }
}