import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CoursesService } from '../../courses.service';
import { Courses } from '../../models'; 
import { Inscription } from '../../../inscriptions/models';
import { MatDialog } from '@angular/material/dialog';
import { AlertsService } from '../../../../../../core/services/alerts.service';
import { CoursesDeleteService } from '../../courses-delete.service';
import { Course } from '../../../users/models/complete';
import { CoursesEditDialogComponent } from '../../components/coursedialog-edit/coursedialog-edit.component';
import { forkJoin } from 'rxjs';
import { Buyer } from '../../../buyers/model';
import { InscriptionService } from '../../../inscriptions/inscription.service';
import { BuyersService } from '../../../buyers/buyers.service';

@Component({
  selector: 'app-courses-detail',
  templateUrl: './courses-detail.component.html',
  styleUrls: ['./courses-detail.component.scss']
})
export class CoursesDetailComponent implements OnInit {
  course: Courses | undefined;
  inscriptions: Inscription[] = [];
  coursesRegister: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private coursesService: CoursesService,
    private router: Router,
    private coursesDeleteService: CoursesDeleteService,
    private dialog: MatDialog,
    private alertsService: AlertsService,
    private inscriptionService: InscriptionService,
    private buyersService: BuyersService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      const courseId = params['id'];
      if (courseId) {
        this.loadCoursesDetails(courseId);
        this.loadInscriptions(courseId);
      }
    });
  }

  loadCoursesDetails(courseId: string): void {
    this.coursesService.getCoursesDetails(courseId).subscribe({
      next: (course: Courses) => {
        this.course = course;
      },
      error: (error: any) => {
        this.alertsService.showError('Error', 'An error occurred while loading course details.');
      }
    });
  }

  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
  
  deleteCourse(course: Courses): void {
    this.alertsService.showAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.coursesService.deleteCoursesById(course.id).subscribe({
          next: () => {
            this.alertsService.showSuccess('Success', 'Course deleted successfully.');
            this.coursesDeleteService.deleteBuyer();
            this.router.navigate(['../'], { relativeTo: this.route }); 
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'An error occurred while deleting the course.');
          }
        });
      }
    });
  }

  editCourse(course: Course): void {
    const dialogRef = this.dialog.open(CoursesEditDialogComponent, {
      width: '1000px',
      data: course 
    });

    dialogRef.afterClosed().subscribe((result: Courses | undefined) => {
      if (result) {
        this.coursesService.updateCoursesById(course.id, result).subscribe({
          next: () => {
            this.loadCoursesDetails(course.id);
            this.alertsService.showSuccess('Success', 'Course updated successfully.');
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'An error occurred while updating the course.');
          }
        });
      }
    });
  }

loadInscriptions(courseId: string): void {
    this.inscriptionService.getInscriptionsByCourseId(courseId).subscribe(
      (inscriptions: Inscription[]) => { 
        const inscriptionRequests = inscriptions.map(inscription =>
          this.buyersService.getBuyerDetails(inscription.buyerId.toString())
        );
  
        forkJoin(inscriptionRequests).subscribe((buyers: Buyer[]) => {
          const coursesRegister = inscriptions.map((inscription, index) => ({
            inscription: inscription,
            buyer: buyers[index]
          }));
          this.coursesRegister = coursesRegister;
        });
      },
      (error: any) => { 
        this.alertsService.showError('Error', 'An error occurred while loading inscriptions.');
      }
    );
  }

  deleteInscriptionCourse(inscription: Inscription): void {
    this.alertsService.showAlert({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.inscriptionService.deleteInscription(inscription.id).subscribe({
          next: () => {
            this.alertsService.showSuccess('Success', 'Inscription deleted successfully.');
            this.loadInscriptions(this.course?.id || '');
          },
          error: (error: any) => {
            this.alertsService.showError('Error', 'An error occurred while deleting the inscription.');
          }
        });
      }
    });
  }
  
}