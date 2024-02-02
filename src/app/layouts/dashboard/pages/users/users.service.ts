import { Injectable, Inject } from '@angular/core';
import { User } from './models';
import { Observable, of } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.service'


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

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(@Inject(AlertsService) private alerts: AlertsService) {}

  getUserById(id: number | string): Observable<User | undefined> {
    return of(USERS_DB.find((user) => user.id == id));
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB);
  }

  loadUsers(): Observable<User[]> {
    return of(USERS_DB);
  }

  createUser(payload: User): Observable<User[]> {
    USERS_DB.push(payload);
    return of(USERS_DB);
  }

  deleteUser(userID: number): Observable<User[]> {
    USERS_DB = USERS_DB.filter((user) => user.id !== userID);
    this.alerts.showSuccess('Realizado', 'Se elimino correctamente');
    return of(USERS_DB);
  }

  updateUser(updatedUser: User): Observable<User[]> {
    const index = USERS_DB.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      USERS_DB[index] = updatedUser;
      this.alerts.showSuccess('Realizado', 'Usuario actualizado correctamente');
    } else {
      this.alerts.showError('Error', 'Usuario no encontrado');
    }
    return of(USERS_DB);
  }
}