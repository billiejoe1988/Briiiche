import { Injectable } from "@angular/core";
import { User } from "../dashboard/pages/users/models";
import { Router } from "@angular/router";
import { AlertsService } from "../../core/services/alerts.service";
import { of, delay, map, finalize, tap, Observable, catchError } from "rxjs";
import { LoadingService } from "../../core/services/loading.service";
import { HttpClient } from "@angular/common/http";
import { enviroment } from "../../enviroments/enviroment";
import { AuthActions } from "../../core/store/auth/actions";
import { Store } from '@ngrx/store';
import { UserClean } from "../dashboard/pages/users/models/complete";

interface LoginData {
  email: null | string;
  password: null | string;
}

@Injectable ({providedIn: 'root'})
export class AuthService {

    constructor(private router: Router, private alertsService: AlertsService, private loadingService: LoadingService, private httpClient: HttpClient, private store: Store) {}
    
    private setAuthUser (user: User ): void{

    this.store.dispatch(AuthActions.setAuthUser({ user }))
    localStorage.setItem('token', user.token);
    }

    login(data: LoginData): Observable<User[]> {
        return this.httpClient.get<User[]>(`${enviroment.apiURL}/users?email=${data.email}&password=${data.password}`)
          .pipe(
            tap((response) => {
              if (!!response[0]) {
                this.setAuthUser(response[0]);
                this.router.navigate(['dashboard', 'home']);
              } else {
                this.alertsService.showError('Error', 'Invalid Email or Password');
              }
            })
          );
      }

    logout(): void {
        this.store.dispatch(AuthActions.logout());
        this.router.navigate(['auth', 'login']);
        localStorage.removeItem('token');
    }

    verifyToken() {
      return this.httpClient
        .get<User[]>(
          `${enviroment.apiURL}/users?token=${localStorage.getItem('token')}`
        )
        .pipe(
          map((response) => {
            if (response.length) {
              this.setAuthUser(response[0]);
              return true;
            } else {
              this.store.dispatch(AuthActions.logout());
              localStorage.removeItem('token');
              return false;
            }
          }),
          catchError(() => of(false))
        );
    }
}
