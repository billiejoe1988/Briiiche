import { inject } from '@angular/core';
import { CanActivateFn , Router, UrlTree } from '@angular/router';
import { AuthService } from '../../layouts/auth/auth.service';
import { Store } from '@ngrx/store';
import { selectAuthUser } from '../store/auth/selectors';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


export const adminGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const authService = inject(AuthService);
  const store = inject(Store);

  return store.select(selectAuthUser).pipe(
    map((user) => {
      const isValidRole = user?.rol === 'ADMIN' || user?.rol === 'USER';
      return isValidRole ? true : router.createUrlTree(['dashboard', 'home']);
    })
  );
};