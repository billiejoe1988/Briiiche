import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, of } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.service';

const ROLES_DB: string[] = ['Admin', 'User'];

let USERS_DB: User[] = [
  {
    id: 1,
    firstName: 'Ricardo',
    lastName: 'Pala',
    password: 'a1234',
    country: 'Argentina',
    email: 'ricardo@gmail.com',
    rol: 'Admin',
    comision: 'Cuisine Begin',
   },
   {
     id: 2,
     firstName: 'America',
     lastName: 'Zardelli',
     password: 'b1122',
     country: 'Chile',
     email: 'America@gmail.com',
     rol: 'User',
     comision: 'Cuisine Pro',
    },
    {
     id: 3,
     firstName: 'Judith',
     lastName: 'Sanz',
     password: 'c4321',
     country: 'USA',
     email: 'js@gmail.com',
     rol: 'User',
     comision: 'Pastry Pro',
    },
];

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private alerts: AlertsService) {}

  getUsers(): Observable<User[]> {
    return of(USERS_DB);
  }

  getUserById(id: number): Observable<User | undefined> {
    return of(USERS_DB.find(user => user.id === id));
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB);
  }

  createUser(payload: User): Observable<User[]> {
    USERS_DB = [...USERS_DB, {...payload, id: USERS_DB.length + 1}];
    this.alerts.showSuccess('Success', 'User created successfully.');
    return of(USERS_DB);
  }

  deleteUserById(userID: number): Observable<User[]> {
    USERS_DB = USERS_DB.filter((user) => user.id !== userID);
    this.alerts.showSuccess('Success', 'User deleted successfully.');
    return of(USERS_DB);
  }

  updateUserById(updatedUser: User): Observable<User[]> {
    const index = USERS_DB.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      USERS_DB[index] = updatedUser;
      this.alerts.showSuccess('Success', 'User updated successfully.');
    } else {
      this.alerts.showError('Error', 'User not found.');
    }
    return of(USERS_DB);
  }
}
