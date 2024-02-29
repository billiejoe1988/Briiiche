import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Courses } from '../../models';
import { CoursesService } from '../../courses.service';
import { AlertsService } from '../../../../../../core/services/alerts.service';

@Component({
  selector: 'app-courses-edit-dialog', 
  templateUrl: './coursedialog-edit.component.html', 
  styleUrls: ['./coursedialog-edit.component.scss']
})
export class CoursesEditDialogComponent {
  coursesEditForm: FormGroup;
  isEditing: boolean = false;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<CoursesEditDialogComponent>,
    private coursesService: CoursesService,
    private alertsService: AlertsService,
    @Inject(MAT_DIALOG_DATA) private editingCourses?: Courses
  ) {
    this.isEditing = !!editingCourses;
    this.coursesEditForm = this.fb.group({
      courseId: [this.isEditing ? editingCourses?.id : null],
      courseName: [this.isEditing ? editingCourses?.courseName : '', [Validators.required]],
      createdAt: [this.isEditing ? editingCourses?.createdAt : '', [Validators.required]]
    });
  
    if (this.isEditing && editingCourses) {
      this.coursesEditForm.patchValue(editingCourses);
    }
  }

  onSave(): void {
    if (this.coursesEditForm.valid) {
      const editedCourse: Courses = this.coursesEditForm.value;
      this.coursesService.updateCoursesById(editedCourse).subscribe({
        next: () => {
          this.alertsService.showSuccess('Success', 'Course updated successfully.');
          this.dialogRef.close(editedCourse);
        },
        error: (error) => {
          console.error('Error updating course:', error);
          this.alertsService.showError('Error', 'An error occurred while updating the course.');
        }
      });
    } else {
      this.alertsService.showError('Error', 'Please fill out all required fields.');
    }
  }
}
