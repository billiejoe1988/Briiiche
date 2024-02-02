import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './models';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'password', 'country', 'email', 'rol', 'comision', 'actions'];
  dataSource: User[] = [];
  userForm: FormGroup;
  editingUser: User | null = null;

  constructor(
    private fb: FormBuilder,
    private usersService: UsersService
  ) {
    this.userForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      password: ['', Validators.required],
      country: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      rol: ['', Validators.required],
      comision: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.usersService.getUsers().subscribe(users => {
      this.dataSource = users;
    });
  }

  onModify(user: User): void {
    this.editingUser = user;
    this.userForm.setValue({
      firstName: user.firstName,
      lastName: user.lastName,
      password: user.password,
      country: user.country,
      email: user.email,
      rol: user.rol,
      comision: user.comision,
    });
  }

  onCancelEdit(): void {
    this.editingUser = null;
    this.userForm.reset();
  }

  onSaveEdit(): void {
    if (this.editingUser && this.userForm.valid) {
      const updatedUser: User = { ...this.editingUser, ...this.userForm.value };
      this.usersService.updateUser(updatedUser).subscribe(() => {
        this.getUsers(); 
        this.editingUser = null;
        this.userForm.reset();
      });
    }
  }

  onDelete(user: User): void {
    const confirmDelete = confirm('¿Estás seguro de que deseas eliminar este usuario?');
    if (confirmDelete) {
      this.usersService.deleteUser(user.id).subscribe(() => {
        this.getUsers(); 
      });
    }
  }

  onUserSubmitted(ev: User): void {
    this.usersService.createUser(ev).subscribe(() => {
      this.getUsers(); 
    });
  }
}