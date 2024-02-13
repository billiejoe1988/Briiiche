import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, of, mergeMap } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.service';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../../../../enviroments/enviroment';

const ROLES_DB: string[] = ['Admin', 'User'];

let USERS_DB: User[] = [];

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}

  getUsers() {
    return this.httpClient.get<User[]>(`${enviroment.apiURL}/users`);
  }

  getUserById(id: number | string) {
    return this.httpClient.get<User>(`${enviroment.apiURL}/users/${id}`);
  }

  getRoles(): Observable<string[]> {
    return of(ROLES_DB);
  }

  createUser(payload: User){
    this.alerts.showSuccess('Success', 'User created successfully.');
    return this.httpClient.post<User[]>(`${enviroment.apiURL}/users`, payload)
    .pipe(mergeMap(() => this.getUsers()));
  }

  deleteUserById(userID: number) {
    return this.httpClient.delete<User>(`${enviroment.apiURL}/users/${userID}`)
    .pipe(mergeMap(() => this.getUsers()));
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
