import { Injectable } from '@angular/core';
import { Observable, of, tap, delay, throwError } from 'rxjs';
import { User } from './models';
import { AlertsService } from '../../../../core/services/alets.service';

const ROLES_DB: string[] = ['ADMIN', 'USER'];

let USERS_DB: User[] = [
  {
    id: 1,
    firstName: 'Ricardo',
    lastName: 'Pala',
    password: 'a1234',
    country: 'Argentina',
    email: 'ricardo@gmail.com',
    rol: 'Admin',
    comision: 'CuisineBegin',
   },
   {
     id: 2,
     firstName: 'America',
     lastName: 'Zardelli',
     password: 'b1122',
     country: 'Chile',
     email: 'Americao@gmail.com',
     rol: 'User',
     comision: 'CuisinePro',
    },
    {
     id: 3,
     firstName: 'Judith',
     lastName: 'Sanz',
     password: 'c4321',
     country: 'USA',
     email: 'js@gmail.com',
     rol: 'User',
     comision: 'Pastry',
    },
];

@Injectable({ providedIn: 'root' })
export class UsersService {
  constructor(private alerts: AlertsService) {}

  getUserById(id: number | string): Observable<User | undefined> {
    return of(USERS_DB.find((user) => user.id == id)).pipe(delay(1000));
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB).pipe(delay(1000));
  }

  loadUsers(): Observable<User[]> {
    return of(USERS_DB).pipe(delay(1000));
  }

  createUser(payload: User): Observable<User[]> {
    USERS_DB.push(payload);
    return this.loadUsers(); 
  }

  deleteUser(userID: number): Observable<User[]> {
    USERS_DB = USERS_DB.filter((user) => user.id !== userID);
    return this.loadUsers().pipe(
      tap(() =>
        this.alerts.showSuccess('Realizado', 'Se elimino correctamente')
      )
    );
  }

  updateUser(updatedUser: User): Observable<User> {
    const index = USERS_DB.findIndex((user) => user.id === updatedUser.id);
    if (index !== -1) {
      USERS_DB[index] = { ...USERS_DB[index], ...updatedUser };
      return of(USERS_DB[index]);
    } else {
      return throwError('Usuario no encontrado');
    }
  }
}
