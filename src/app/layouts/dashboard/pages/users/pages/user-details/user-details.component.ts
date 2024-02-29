import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UsersService } from '../../users.service';
import { LoadingService } from '../../../../../../core/services/loading.service';
import { UserWithCoursesAndInscriptions, Course, Inscription } from '../../models/complete';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss'],
})
export class UserDetailComponent  {
  user: UserWithCoursesAndInscriptions | undefined;
  userInscriptions: Inscription[] = [];

  constructor(
    private route: ActivatedRoute,
    private usersService: UsersService,
    private loadingService: LoadingService,
    private router: Router
  ) {}
  
  goBackToList(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }
}
