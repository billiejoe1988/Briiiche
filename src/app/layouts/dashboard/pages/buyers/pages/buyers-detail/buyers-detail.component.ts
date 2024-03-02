import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AlertsService } from '../../../../../../core/services/alerts.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { BuyersService } from '../../buyers.service';
import { Buyer } from '../../model';
import { forkJoin } from 'rxjs';
import { DialogEditComponent } from '../../components/dialog-edit/dialog-edit.component';
import { BuyerDeleteService } from '../../buyer-delete.service';
import { InscriptionService } from '../../../inscriptions/inscription.service';
import { CoursesService } from '../../../courses/courses.service';
import { Course } from '../../../users/models/complete';
import { Inscription } from '../../../inscriptions/models';

@Component({
  selector: 'app-buyers-detail',
  templateUrl: './buyers-detail.component.html',
  styleUrl: './buyers-detail.component.scss'
})
export class BuyersDetailComponent implements OnInit {
  buyer: Buyer | undefined;
  buyersInscribed: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private buyersService: BuyersService,
    private inscriptionService: InscriptionService,
    private coursesService: CoursesService,
    private loadingService: LoadingService,
    private router: Router,
    private alertsService: AlertsService,
    private buyerDeleteService: BuyerDeleteService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const buyerId = params['id'];
      if (buyerId) {
        this.loadBuyerDetails(buyerId);
        this.loadCoursesInscribed(buyerId);
      }
    });
  }

  loadBuyerDetails(buyerId: string): void {
    this.buyersService.getBuyerDetails(buyerId).subscribe({
      next: (buyer: Buyer) => {
        this.buyer = buyer;
      },
      error: (error: any) => {
        console.error('Error loading buyer details:', error);
        this.alertsService.showError('Error', 'An error occurred while loading buyer details.');
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  deleteBuyer(buyer: Buyer): void {
    this.alertsService.showAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.buyersService.deleteBuyerById(buyer.id).subscribe({
          next: () => {
            this.alertsService.showSuccess('Success', 'buyer deleted successfully.');
            this.buyerDeleteService.deleteBuyer();
            this.router.navigate(['../'], { relativeTo: this.route }); 
          },
          error: (error: any) => {
            console.error('Error deleting buyer:', error);
            this.alertsService.showError('Error', 'An error occurred while deleting the buyer.');
          }
        });
      }
    });
  }

  editBuyer(buyer: Buyer): void {
    const dialogRef = this.dialog.open(DialogEditComponent, {
      width: '1000px',
      data: buyer 
    });

    dialogRef.afterClosed().subscribe((result: Buyer | undefined) => {
      if (result) {
        this.buyersService.updateBuyerById(buyer).subscribe({
          next: () => {
            this.loadBuyerDetails(buyer.id);
            this.alertsService.showSuccess('Success', 'buyer updated successfully.');
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'An error occurred while updating the buyer.');
          }
        });
      }
    });
   }

   loadCoursesInscribed(buyerId: string): void {
    this.inscriptionService.getInscriptionsById(buyerId).subscribe(
      (inscriptions: Inscription[]) => { 
        const courseRequests = inscriptions.map(inscription =>
          this.coursesService.getCoursesDetails(inscription.courseId.toString())
        );
  
        forkJoin(courseRequests).subscribe((courses: Course[]) => {
          const buyersInscribed = inscriptions.map((inscription, index) => ({
            inscription: inscription,
            course: courses[index]
          }));
          this.buyersInscribed = buyersInscribed;
        });
      },
      (error: any) => { 
        this.alertsService.showError('Error', 'An error occurred while loading inscriptions.');
      }
    );
  }
}
  