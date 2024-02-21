import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class adminGuard implements CanActivate {

  constructor(
    private router: Router,
    private authService: AuthService,
    private store: Store
  ) {}

  canActivate(): Observable<boolean | UrlTree> {
    return this.store.select(selectAuthUser).pipe(
      map(user => {
        if (user && user.rol === 'ADMIN') {
          return true;
        } else {
          return this.router.createUrlTree(['dashboard', 'home']);
        }
      })
    );
  }
}
