import { Component } from '@angular/core';
import { User } from './models/'

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss'
})

export class UsersComponent {
  displayedColumns: string[] = ['id', 'fullName', 'password', 'country', 'email', 'rol', 'comision'];
  dataSource: User[] = [
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

 onUserSubmitted(ev: User): void{
  this.dataSource = [... this.dataSource, {...ev, id: new Date().getTime() }];
 }
}
