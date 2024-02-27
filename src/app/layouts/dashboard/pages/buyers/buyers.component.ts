import { Component, OnInit } from '@angular/core'; 
import { User } from '../users/models';
import { BuyersService } from './buyers.service';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditComponent } from './components/dialog-edit/dialog-edit.component';
import { DialogAddComponent } from './components/dialog-add/dialog-add.component';
import { AlertsService } from '../../../../core/services/alerts.service';
import { catchError, finalize } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-buyers',
  templateUrl: './buyers.component.html',
  styleUrls: ['./buyers.component.scss']
})
export class BuyersComponent implements OnInit {
  buyers: User[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'country', 'actions'];
  loading = false;

  constructor(
    private buyersService: BuyersService,
    private dialog: MatDialog,
    private alertsService: AlertsService
  ) {}

  ngOnInit(): void {
    this.refreshBuyersList();
  }

  refreshBuyersList(): void {
    this.loading = true;
    this.buyersService.getAllBuyers().pipe(
      catchError((error) => {
        console.error('Error fetching buyers:', error);
        this.alertsService.showError('Error', 'An error occurred while fetching the buyers.');
        return throwError(error);
      }),
      finalize(() => this.loading = false)
    ).subscribe((buyers) => {
      this.buyers = buyers;
    });
  }
  onDelete(buyerId: string): void {
    this.alertsService.showAlert({
      title: 'Confirm Delete',
      text: 'Are you sure you want to delete this buyer?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.loading = true;
        this.buyersService.deleteBuyer(buyerId).pipe(
          catchError((error) => {
            console.error('Error deleting buyer:', error);
            this.alertsService.showError('Error', 'An error occurred while deleting the buyer.');
            return throwError(error);
          }),
          finalize(() => this.loading = false)
        ).subscribe(() => {
          this.alertsService.showSuccess('Success', 'Buyer deleted successfully.');
          this.refreshBuyersList();
        });
      }
    });
  }

  onEdit(buyer: User): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      data: buyer
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.buyersService.updateBuyer(result).subscribe(() => {
          this.alertsService.showSuccess('Success', 'Buyer updated successfully.');
          this.refreshBuyersList();
        }, (error) => {
          console.error('Error updating buyer:', error);
          this.alertsService.showError('Error', 'An error occurred while updating the buyer.');
        });
      }
    });
  }

  onCreate(): void {
    const dialogRef = this.dialog.open(DialogAddComponent);
    dialogRef.afterClosed().subscribe(newBuyer => {
      if (newBuyer) {
        this.buyersService.createBuyer(newBuyer).subscribe(() => {
          this.alertsService.showSuccess('Success', 'Buyer added successfully.');
          this.refreshBuyersList();
        }, (error) => {
          console.error('Error creating buyer:', error);
          this.alertsService.showError('Error', 'An error occurred while creating the buyer.');
        });
      }
    });
  }
}
