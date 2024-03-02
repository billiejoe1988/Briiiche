import { Injectable } from '@angular/core';
import { User } from './models';
import { Observable, of, mergeMap, catchError, throwError, tap, map } from 'rxjs';
import { AlertsService } from '../../../../core/services/alerts.service';
import { HttpClient, HttpErrorResponse  } from '@angular/common/http';
import { enviroment } from '../../../../enviroments/enviroment';
import { Pagination } from '../../../../core/models/pagination';

const ROLES_DB: string[] = ['ADMIN', 'USER', 'BUYER'];

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  constructor(private alerts: AlertsService, private httpClient: HttpClient) {}

  generateString(length: number): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
   
  paginate(page: number, perPage: number): Observable<Pagination<User>> {
    return this.httpClient.get<Pagination<User>>(`${enviroment.apiURL}/users?_page=${page}&_per_page=${perPage}`);
  }

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
    return this.httpClient.post<User[]>(`${enviroment.apiURL}/users`, {...payload, token: this.generateString(5),})
    .pipe(mergeMap(() => this.getUsers()));
  }

  deleteUserById(userID: number) {
    return this.httpClient.delete<User>(`${enviroment.apiURL}/users/${userID}`)
    .pipe(mergeMap(() => this.getUsers()));
  }

  updateUserById(updatedUser: User): Observable<User[]> {
    return this.httpClient.put<User>(`${enviroment.apiURL}/users/${updatedUser.id}`, updatedUser)
      .pipe(
        mergeMap(() => {
          this.alerts.showSuccess('Success', 'User updated successfully.');
          return this.getUsers();
        }),
        catchError(error => {
          this.alerts.showError('Error', 'Failed to update user.');
          return throwError(error);
        })
      );
  }

  getUserRoleById(userId: any): Observable<string> {
    return this.httpClient.get<User>(`${enviroment.apiURL}/users/${userId}`).pipe(
      map((user: User) => user.rol) 
    );
  }
  
  getUserDetails(userId: string): Observable<User> {
    const url = `${enviroment.apiURL}/users/${userId}`;
    return this.httpClient.get<User>(url).pipe();
  }
}