import { Component, OnInit } from '@angular/core';
import { User } from './models';
import { UsersService} from './users.service';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from '../../../../core/services/alerts.service';
import { UsersDialogComponent } from './components/users-dialog/users-dialog.component';
import { Subject } from 'rxjs';
import { Pagination } from '../../../../core/models/pagination';
import { PageEvent } from '@angular/material/paginator';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  displayedColumns: string[] = ['id', 'fullName', 'password', 'country', 'email', 'rol', 'comision', 'actions'];
  users: User[] = [];

  totalItems =0;
  pageSize=5;
  currentPage = 1;

  private userSavedSubject: Subject<void> = new Subject<void>();

  constructor(private usersService: UsersService, public dialog: MatDialog, private alertsService: AlertsService) { }

  ngOnInit(): void {
    this.loadUsers();
    this.userSavedSubject.subscribe(() => {
      this.loadUsers();
    });
  }

  loadUsers(): void {
    this.usersService.paginate(this.currentPage, this.pageSize).subscribe({
      next: (paginationResult: Pagination<User>) => {
        this.users = paginationResult.data;
        this.totalItems = paginationResult.items;
      },
      error: (error: any) => {
        console.error('Error loading users:', error);
        this.alertsService.showError('Error', 'An error occurred while loading users.');
      }
    });
  }

  onPage(ev: PageEvent) {
    this.usersService.paginate(ev.pageIndex + 1, ev.pageSize).subscribe({
      next: (paginateResult) => {
        this.totalItems = paginateResult.items;
        this.users = paginateResult.data;
        this.pageSize = ev.pageSize;
        this.currentPage = ev.pageIndex + 1; 
      }
    });
  }
  
  onCreate(): void {
    this.dialog.open(UsersDialogComponent)
      .afterClosed()
      .subscribe((result: User | undefined) => {
        if (result) {
          this.usersService.createUser(result).subscribe({
            next: () => {
              this.userSavedSubject.next(); 
              this.alertsService.showSuccess('Success', 'User added successfully.');
            },
            error: (error: any) => {
              console.error('Error creating user:', error);
              this.alertsService.showError('Error', 'An error occurred while creating the user.');
            }
          });
        }
      });
  }

  onModify(user: User): void {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      data: user,
    });
  
    dialogRef.afterClosed().subscribe((result: User | undefined) => {
      if (result) {
        result.id = user.id;
        
        this.usersService.updateUserById(result).subscribe({
          next: () => {
            this.loadUsers(); 
            this.alertsService.showSuccess('Success', 'User updated successfully.');
            this.users = this.users.filter(u => u.id !== user.id);
            this.users.push(result);
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'An error occurred while updating the user.');
          }
        });
        dialogRef.componentInstance.onSave();
      }
    });
  }

  deleteUser(user: User): void {
    this.alertsService.showAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersService.deleteUserById(user.id).subscribe({
          next: () => {
            this.loadUsers();
            this.alertsService.showSuccess('Success', 'User deleted successfully.');
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'An error occurred while deleting the user.');
          }
        });
      }
    });
  }

  onUserSubmitted(user: User): void {
    this.usersService.createUser(user).subscribe({
      next: () => {
        this.loadUsers();
        this.alertsService.showSuccess('Success', 'User added successfully.'); 
      },
      error: (error: any) => {
        this.alertsService.showError('Error', 'An error occurred while creating the user.');
      }
    });
  }
}
