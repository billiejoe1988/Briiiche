import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { AlertsService } from '../../../../../../core/services/alerts.service';
import { User } from '../../models';
import { UserDeleteService } from '../../user-delete.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { UsersDialogComponent } from '../../components/users-dialog/users-dialog.component';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailComponent implements OnInit {
  user: User | undefined;

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService,
    private router: Router,
    private alertsService: AlertsService,
    private userDeleteService: UserDeleteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const userId = params['id'];
      if (userId) {
        this.loadUserDetails(userId);
      }
    });
  }

  loadUserDetails(userId: string): void {
    this.usersService.getUserDetails(userId).subscribe({
      next: (user: User) => {
        this.user = user;
      },
      error: (error: any) => {
        console.error('Error loading user details:', error);
        this.alertsService.showError('Error', 'An error occurred while loading user details.');
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
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
            this.alertsService.showSuccess('Success', 'User deleted successfully.');
            this.userDeleteService.deleteUser();
            this.router.navigate(['../'], { relativeTo: this.route }); 
          },
          error: (error: any) => {
            console.error('Error deleting user:', error);
            this.alertsService.showError('Error', 'An error occurred while deleting the user.');
          }
        });
      }
    });
  }

  editUser(user: User): void {
    const dialogRef = this.dialog.open(UsersDialogComponent, {
      width: '1000px',
      data: user 
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.user = result;
      }
    });
  }
}
